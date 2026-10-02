import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Phone as PhoneIcon, PhoneDisconnect, Backspace, ChatText } from '@phosphor-icons/react'
import { DEMO_CODE, dispatchLatest, handle, type Reply } from '../ussd'

type Mode = 'idle' | 'running' | 'session'

const KEYS: [string, string][] = [
  ['1', ''], ['2', 'abc'], ['3', 'def'],
  ['4', 'ghi'], ['5', 'jkl'], ['6', 'mno'],
  ['7', 'pqrs'], ['8', 'tuv'], ['9', 'wxyz'],
  ['*', ''], ['0', '+'], ['#', ''],
]

const ease = [0.23, 1, 0.32, 1] as const

export function Phone() {
  const [mode, setMode] = useState<Mode>('idle')
  const [dial, setDial] = useState(DEMO_CODE)
  const [path, setPath] = useState('')
  const [reply, setReply] = useState<Reply | null>(null)
  const [input, setInput] = useState('')
  const [sms, setSms] = useState<string | null>(null)
  const [step, setStep] = useState(0) // bumps on every screen change, drives the crossfade
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  function show(r: Reply) {
    setReply(r)
    setInput('')
    setStep((s) => s + 1)
    if (r.text.includes('created (cash on delivery)')) {
      later(() => {
        const msg = dispatchLatest()
        if (msg) setSms(msg)
      }, 2200)
    }
  }

  function call() {
    if (mode === 'idle') {
      if (dial.replace(/\s/g, '') !== DEMO_CODE) {
        setDial(DEMO_CODE)
        return
      }
      setMode('running')
      setStep((s) => s + 1)
      later(() => {
        setMode('session')
        setPath('')
        show(handle(''))
      }, 650)
      return
    }
    if (mode === 'session' && reply) {
      if (reply.done) return hangUp()
      if (!input) return
      const next = path ? `${path}*${input}` : input
      setPath(next)
      show(handle(next))
    }
  }

  function hangUp() {
    setMode('idle')
    setReply(null)
    setPath('')
    setInput('')
    setDial(DEMO_CODE)
    setStep((s) => s + 1)
  }

  function press(k: string) {
    if (sms) setSms(null)
    if (mode === 'idle') return setDial((d) => (d === DEMO_CODE ? k : (d + k).slice(0, 16)))
    if (mode === 'session' && reply && !reply.done) setInput((v) => (v + k).slice(0, 40))
  }

  function back() {
    if (mode === 'idle') return setDial((d) => d.slice(0, -1))
    setInput((v) => v.slice(0, -1))
  }

  // Keyboard works when the phone has focus, and allows letters (names,
  // landmarks) that the keypad would need multi-tap for.
  function onKey(e: KeyboardEvent) {
    if (e.key === 'Enter') return e.preventDefault(), call()
    if (e.key === 'Escape') return hangUp()
    if (e.key === 'Backspace') return e.preventDefault(), back()
    if (e.key.length === 1 && /[\w*#+ ,.'-]/.test(e.key)) {
      if (mode === 'session' && reply && !reply.done) setInput((v) => (v + e.key).slice(0, 40))
      else if (mode === 'idle' && /[\d*#]/.test(e.key)) press(e.key)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        tabIndex={0}
        onKeyDown={onKey}
        aria-label="Interactive USSD demo phone. Type to enter, Enter to send, Escape to hang up."
        className="w-[264px] rounded-[2.4rem] bg-phone p-4 pb-5 shadow-[0_30px_80px_-20px_rgb(19_21_19/0.45),inset_0_1px_0_rgb(255_255_255/0.08)] ring-1 ring-black/20"
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/10" />

        {/* LCD */}
        <div className="relative h-[232px] overflow-hidden rounded-xl bg-lcd p-3 font-mono text-[12.5px] leading-[1.45] text-lcd-ink shadow-[inset_0_2px_8px_rgb(0_0_0/0.18)]">
          <div className="mb-2 flex items-center justify-between text-[10px] opacity-70">
            <span>KE 4G</span>
            <span>12:47</span>
          </div>

          <div aria-live="polite">
            <motion.div
              key={step}
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.16, ease }}
              className="whitespace-pre-line"
            >
              {mode === 'idle' && (
                <div className="flex h-[176px] flex-col justify-end">
                  <div className="text-[10px] opacity-70">Dial</div>
                  <div className="break-all text-[22px] leading-tight tracking-tight">{dial || ' '}</div>
                </div>
              )}
              {mode === 'running' && <div className="pt-14 text-center">USSD code running...</div>}
              {mode === 'session' && reply && (
                <div>
                  <div className="max-h-[150px] overflow-y-auto">{reply.text}</div>
                  {!reply.done && (
                    <div className="mt-2 border-t border-lcd-ink/25 pt-1.5">
                      {input}
                      <span className="ml-px inline-block h-[13px] w-[7px] translate-y-[2px] animate-pulse bg-lcd-ink/80 motion-reduce:animate-none" />
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Soft-key labels */}
          <div className="absolute inset-x-3 bottom-2 flex justify-between text-[10px] font-semibold uppercase opacity-80">
            <span>{mode === 'session' && reply && !reply.done ? 'Send' : mode === 'idle' ? 'Call' : 'OK'}</span>
            <span>{mode === 'idle' ? 'Del' : 'Cancel'}</span>
          </div>

          <AnimatePresence>
            {sms && (
              <motion.button
                type="button"
                onClick={() => setSms(null)}
                initial={{ transform: 'translateY(-110%)' }}
                animate={{ transform: 'translateY(0%)' }}
                exit={{ transform: 'translateY(-110%)' }}
                transition={{ duration: 0.28, ease }}
                className="absolute inset-x-2 top-2 rounded-lg bg-lcd-ink p-2.5 text-left text-[11px] leading-snug text-lcd shadow-lg"
              >
                <span className="mb-1 flex items-center gap-1 text-[10px] uppercase opacity-70">
                  <ChatText size={12} weight="bold" /> SMS from MOTORIDA
                </span>
                {sms}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Call / clear / end */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button type="button" onClick={call} aria-label="Call or send" className="press flex h-10 items-center justify-center rounded-full bg-[#2f8f4e] text-white">
            <PhoneIcon size={18} weight="fill" />
          </button>
          <button type="button" onClick={back} aria-label="Delete" className="press flex h-10 items-center justify-center rounded-full bg-white/10 text-white/80">
            <Backspace size={18} />
          </button>
          <button type="button" onClick={hangUp} aria-label="Hang up" className="press flex h-10 items-center justify-center rounded-full bg-[#c23b2a] text-white">
            <PhoneDisconnect size={18} weight="fill" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {KEYS.map(([k, sub]) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              className="press flex h-11 flex-col items-center justify-center rounded-2xl bg-white/[0.06] text-white ring-1 ring-white/[0.06]"
            >
              <span className="font-mono text-[17px] leading-none">{k}</span>
              {sub && <span className="mt-0.5 text-[8.5px] uppercase tracking-wider text-white/45">{sub}</span>}
            </button>
          ))}
        </div>
      </div>

      <p className="max-w-[300px] text-center text-sm leading-relaxed text-muted">
        Press the green key to dial. Reply <span className="font-mono text-ink">1</span> then <span className="font-mono text-ink">2</span> to order lunch, or <span className="font-mono text-ink">2</span> then <span className="font-mono text-ink">3</span> to take a rider job.
      </p>
    </div>
  )
}
