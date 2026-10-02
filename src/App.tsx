import { motion } from 'motion/react'
import {
  ArrowRight,
  ArrowUpRight,
  ChatText,
  CurrencyCircleDollar,
  GithubLogo,
  Handshake,
  Headset,
  ShieldCheck,
  Storefront,
  Tag,
} from '@phosphor-icons/react'
import { Phone } from './components/Phone'
import { Reveal } from './components/Reveal'

// Placeholders, swap before sharing widely.
const CONTACT = 'mailto:hello@motorida.co.ke'
const REPO = 'https://github.com/skwagz/motorida-frontend' // backend repo is private, available on request

const ease = [0.23, 1, 0.32, 1] as const

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <HowItWorks />
        <TwoSides />
        <WhyNow />
        <Model />
        <Build />
        <Closing />
      </main>
      <Footer />
    </>
  )
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
      <img src="/favicon.svg" alt="" className="size-7" />
      <span className="text-[17px]">Motorida</span>
    </a>
  )
}

function Nav() {
  const links = [
    ['How it works', '#how'],
    ['Who it serves', '#sides'],
    ['Model', '#model'],
    ['Build', '#build'],
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Logo />
        <div className="hidden items-center gap-8 text-[15px] text-muted md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors duration-200 hover:text-ink">
              {label}
            </a>
          ))}
        </div>
        <a href={CONTACT} className="press rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg">
          Get in touch
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  const item = (i: number) => ({
    initial: { opacity: 0, transform: 'translateY(12px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: { duration: 0.7, delay: 0.08 + i * 0.07, ease },
  })

  return (
    <section id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-20 md:px-8 md:pt-16 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-8">
      <div>
        <motion.p {...item(0)} className="mb-6 font-mono text-[13px] tracking-wide text-accent">
          Hauhitaji smartphone wala data.
        </motion.p>
        <motion.h1 {...item(1)} className="max-w-[12ch] text-5xl leading-[1] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-[5.2rem]">
          Boda delivery on any phone.
        </motion.h1>
        <motion.p {...item(2)} className="mt-7 max-w-[40ch] text-lg leading-relaxed text-muted">
          Motorida dispatches boda riders over USSD and SMS, so the smallest kitchens and kiosks deliver without an app or data.
        </motion.p>
        <motion.div {...item(3)} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#demo"
            onClick={() => setTimeout(() => document.getElementById('demo-phone')?.querySelector<HTMLElement>('[tabindex]')?.focus(), 400)}
            className="press inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink"
          >
            Try the demo <ArrowRight size={18} weight="bold" />
          </a>
          <a href="#model" className="press inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-medium ring-1 ring-line hover:bg-sunk">
            See the numbers
          </a>
        </motion.div>
      </div>

      <motion.div
        id="demo"
        initial={{ opacity: 0, transform: 'translateY(24px)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: 0.9, delay: 0.25, ease }}
        className="relative flex justify-center lg:justify-end"
      >
        <img
          src="/img/rider.jpg"
          alt="A boda boda rider in a reflective vest carrying a passenger through town"
          className="absolute top-6 right-0 hidden h-[86%] w-[72%] rounded-2xl object-cover lg:block"
        />
        <div id="demo-phone" className="relative lg:mr-[44%] lg:pt-2">
          <Phone />
        </div>
      </motion.div>
    </section>
  )
}

function Story() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[0.85fr_1fr] md:items-center md:gap-16 md:px-8 md:py-28">
        <Reveal>
          <figure>
            <img
              src="/img/mama-cooking.jpg"
              alt="A woman smiling as she cooks over an open fire outdoors"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-3 text-sm text-muted">Illustrative. The pilot starts with 2-4 home kitchens near one construction site.</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="max-w-[18ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-5xl">
            She cooks the best lunch near the site. Only people walking past can buy it.
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
            Kenya's home kitchens and kiosks sell within walking distance. Delivery apps expect a smartphone, a data bundle and steady volume. She has a basic phone and regulars on a site two kilometres away.
          </p>
          <p className="mt-8 max-w-[40ch] border-l-2 border-accent pl-5 text-xl leading-snug font-medium">
            Motorida puts a rider on the phone she already owns.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const STEPS = [
  {
    verb: 'Dial',
    who: 'The kitchen',
    text: 'Dials the USSD code and enters the customer, the landmark and the order.',
    msg: 'Enter dropoff landmark:\n> Ruiru site, gate B',
  },
  {
    verb: 'Dispatch',
    who: 'The sacco stage',
    text: 'A dispatcher at the local sacco offers the job to the nearest free rider.',
    msg: 'Job #42: dropoff at Ruiru site, gate B\n1. Accept\n2. Reject',
  },
  {
    verb: 'Ride',
    who: 'The rider',
    text: 'Confirms pickup over USSD. The kitchen gets an SMS for every change.',
    msg: 'Pickup confirmed for job #42. Deliver to Ruiru site, gate B.',
  },
  {
    verb: 'Settle',
    who: 'Everyone',
    text: 'Cash on delivery or straight to her own Till. The rider logs what was collected.',
    msg: 'Enter amount collected (KES):\n> 900',
  },
]

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-5xl">One order, start to finish. Zero data used.</h2>
      </Reveal>

      {/* One trigger on the container (the scaled-to-zero line can't be observed
          itself). The route line fills left to right as the steps arrive. */}
      <motion.div className="relative mt-14" initial="hidden" whileInView="shown" viewport={{ once: true, margin: '-120px' }}>
        <motion.div
          aria-hidden
          className="absolute top-[7px] right-0 left-0 hidden h-px origin-left bg-accent md:block"
          variants={{
            hidden: { transform: 'scaleX(0)' },
            shown: { transform: 'scaleX(1)', transition: { duration: 1.4, ease: [0.77, 0, 0.175, 1] } },
          }}
        />
        <ol className="grid gap-12 md:grid-cols-4 md:gap-6">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.verb}
              variants={{
                hidden: { opacity: 0, transform: 'translateY(14px)' },
                shown: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.55, delay: 0.15 + i * 0.28, ease } },
              }}
              className="relative"
            >
              <span className="block size-[15px] rounded-full border-[3px] border-accent bg-bg" />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.verb}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{s.who}</p>
              <p className="mt-3 max-w-[30ch] leading-relaxed text-muted">{s.text}</p>
              <pre className="mt-5 rounded-2xl rounded-tl-sm bg-lcd p-4 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-lcd-ink">{s.msg}</pre>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  )
}

function Side({
  img,
  alt,
  tagline,
  english,
  points,
  className = '',
}: {
  img: string
  alt: string
  tagline: string
  english: string
  points: [typeof Tag, string][]
  className?: string
}) {
  return (
    <Reveal className={className}>
      <img src={img} alt={alt} loading="lazy" className="aspect-[16/11] w-full rounded-2xl object-cover" />
      <h3 className="mt-8 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{tagline}</h3>
      <p className="mt-1 text-lg text-muted">{english}</p>
      <ul className="mt-7 space-y-4">
        {points.map(([Icon, text]) => (
          <li key={text} className="flex gap-3.5">
            <Icon size={22} weight="duotone" className="mt-0.5 shrink-0 text-accent" />
            <span className="leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function TwoSides() {
  return (
    <section id="sides" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-[22ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-5xl">
            Two people get burned by delivery apps. Motorida is built for both.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-16 md:grid-cols-2 md:gap-12">
          <Side
            img="/img/riders-road.jpg"
            alt="Boda boda riders on a dirt road at a roadside stage"
            tagline="Kazi ya hakika, si ahadi tu."
            english="For riders: real work, not just promises."
            points={[
              [Tag, 'Know the fare before you accept. No algorithm changes it afterwards.'],
              [Headset, 'A person from your sacco answers the phone, not a support ticket.'],
              [ChatText, 'Jobs arrive by SMS on the phone you already have. No data bundle.'],
            ]}
          />
          <Side
            className="md:mt-28"
            img="/img/kitchen.jpg"
            alt="A smiling cook in a red top preparing food in her kitchen"
            tagline="Delivery bila hatari."
            english="For businesses: delivery without the risk."
            points={[
              [CurrencyCircleDollar, 'Customer money goes to your own M-Pesa Till. Motorida never touches it.'],
              [ShieldCheck, 'Riders come from the sacco at your stage, registered and known by name.'],
              [Storefront, 'One flat KES 250 a week. No cut of any order.'],
            ]}
          />
        </div>
      </div>
    </section>
  )
}

function WhyNow() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-5xl">The low end of the market is wide open.</h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
        <Reveal className="rounded-2xl bg-sunk p-7 md:col-span-2 md:p-9">
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Every competitor is app-only.</h3>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-muted">
            They need a smartphone on both sides and use SMS only for notifications. None of them take an order over USSD.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {['TumaBoda', 'SafeBoda', 'Pick-Up Mtaani', 'Pastel Blues'].map((n) => (
              <span key={n} className="rounded-full bg-surface px-3.5 py-1.5 text-sm ring-1 ring-line">
                {n} <span className="text-muted">needs an app</span>
              </span>
            ))}
            <span className="rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-ink">Motorida works on any phone</span>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative min-h-[320px] overflow-hidden rounded-2xl md:row-span-2">
          <img src="/img/nairobi.jpg" alt="Nairobi skyline with a highway curving through it" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e100e]/90 via-[#0e100e]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-[#ecede8]">
            <p className="text-6xl font-semibold tracking-[-0.04em]">2M+</p>
            <p className="mt-2 max-w-[24ch] leading-snug">licensed boda riders in Kenya. Delivery work fills the hours between fares.</p>
            <p className="mt-3 text-xs text-[#ecede8]/70">Source: Capital FM, April 2025</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="rounded-2xl bg-accent p-7 text-accent-ink">
          <p className="font-mono text-sm font-semibold">17 Nov 2025</p>
          <h3 className="mt-3 text-xl leading-snug font-semibold">Riders struck nationwide over hidden commissions.</h3>
          <p className="mt-2 leading-relaxed">Motorida charges riders no commission at all.</p>
        </Reveal>

        <Reveal delay={0.16} className="rounded-2xl p-7 ring-1 ring-line">
          <h3 className="text-xl leading-snug font-semibold">Sendy went upmarket and ended in administration.</h3>
          <p className="mt-2 leading-relaxed text-muted">Motorida starts with the smallest customers and stays close to them.</p>
        </Reveal>
      </div>
    </section>
  )
}

const STATS = [
  ['KES 250', 'flat fee per business, per week'],
  ['0%', 'commission on any order'],
  ['~73%', 'contribution margin per delivery'],
  ['~13', 'paying businesses to break even'],
]

const PILOT = [
  ['Weeks 1-4', 'One site, one sacco, 2-4 kitchens. Manual dispatch, free to use.'],
  ['Weeks 5-8', 'Flat fee starts. First rider and kitchen referrals. USSD goes live.'],
  ['Weeks 9-13', 'Second wave through chama groups. Decide on site two.'],
]

function Model() {
  return (
    <section id="model" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-[22ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-5xl">
            Paid for coordination, never a cut of her sales.
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">
            Staying out of the money flow keeps trust high and avoids payment licensing until volume justifies it.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {STATS.map(([n, label], i) => (
            <Reveal key={n} delay={i * 0.06} className="border-l border-line pr-4 pl-5">
              <p className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{n}</p>
              <p className="mt-2 max-w-[20ch] text-muted">{label}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Modelled from current Africa's Talking SMS and USSD pricing at ~18 deliveries a week per kitchen. Pre-revenue estimates.
        </p>

        <Reveal className="mt-16 rounded-2xl bg-bg p-7 md:p-10">
          <h3 className="flex items-center gap-2.5 text-xl font-semibold">
            <Handshake size={24} weight="duotone" className="text-accent" /> The 90-day pilot
          </h3>
          <ol className="mt-7 grid gap-8 md:grid-cols-3">
            {PILOT.map(([when, what]) => (
              <li key={when}>
                <p className="font-mono text-sm font-semibold text-accent">{when}</p>
                <p className="mt-2 leading-relaxed">{what}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

const CODE = `// Africa's Talking resends the FULL text ("1*2*Jane")
// on every step, so the menu is: split on '*' and
// switch on depth. No session store needed.
function handle(db, { phoneNumber, text }) {
  const parts = text ? text.split('*') : [];

  if (parts.length === 0) {
    return con('Welcome to Motorida\\n1. I am a Business\\n2. I am a Rider');
  }
  if (parts[0] === '1') return handleBusiness(db, phoneNumber, parts);
  if (parts[0] === '2') return handleRider(db, phoneNumber, parts);
  return end('Invalid choice. Please dial again.');
}`

const STATES = ['created', 'assigned', 'picked_up', 'delivered']

function Build() {
  return (
    <section id="build" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-5xl">The backend is already built.</h2>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
          Node and Express, Africa's Talking for USSD and SMS, Safaricom Daraja for M-Pesa. Dispatch stays human on purpose until volume makes it the bottleneck.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="overflow-hidden rounded-2xl bg-[#131513] ring-1 ring-white/5">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-xs text-[#a1a69f]">
            <span>backend/src/ussd.js</span>
            <span>JavaScript</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-[#d9dbd4]">
            <code>{CODE}</code>
          </pre>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <div className="rounded-2xl bg-sunk p-6">
            <p className="text-sm font-medium text-muted">Order lifecycle, validated through one choke point</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {STATES.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <motion.span
                    initial={{ backgroundColor: 'var(--surface)', color: 'var(--ink)' }}
                    whileInView={{ backgroundColor: 'var(--accent)', color: 'var(--accent-ink)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.25, delay: 0.4 + i * 0.35, ease: 'easeOut' }}
                    className="rounded-full px-3 py-1.5 font-mono text-[13px] ring-1 ring-line"
                  >
                    {s}
                  </motion.span>
                  {i < STATES.length - 1 && <ArrowRight size={14} className="text-muted" />}
                </div>
              ))}
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5">
            {[
              ['8 / 8', 'tests passing on node:test'],
              ['USSD + SMS', 'zero-data channels on both sides'],
              ['STK push', 'weekly fee billed over Daraja'],
              ['JSON store', 'no database until it is needed'],
            ].map(([k, v]) => (
              <li key={k}>
                <p className="font-mono text-[15px] font-semibold">{k}</p>
                <p className="mt-1 text-sm text-muted">{v}</p>
              </li>
            ))}
          </ul>
          <a href={REPO} target="_blank" rel="noreferrer" className="press inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 font-medium ring-1 ring-line hover:bg-sunk">
            <GithubLogo size={18} weight="fill" /> View the code <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="border-t border-line bg-surface">
      <Reveal className="mx-auto max-w-3xl px-4 py-24 text-center md:py-32">
        <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance md:text-6xl">Building the first pilot in Kenya.</h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
          Looking for pilot partners, early investors and anyone who knows boda saccos from the inside.
        </p>
        <a href={CONTACT} className="press mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-medium text-accent-ink">
          Get in touch <ArrowRight size={18} weight="bold" />
        </a>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <Logo />
        <p>
          Built by{' '}
          <a href="https://github.com/skwagz" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
            Samuel Kaguima
          </a>
          . Photos from Unsplash.
        </p>
      </div>
    </footer>
  )
}
