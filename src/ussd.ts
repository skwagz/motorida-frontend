// Browser port of backend/src/ussd.js, same menu text and the same trick:
// Africa's Talking resends the whole `text` ("1*2*0712...") each step, so the
// menu is just "split on * and switch on depth". State lives in a tiny
// in-memory store seeded so a visitor can create an order or take a job
// without registering first.

export type Reply = { text: string; done: boolean }
type Order = { id: number; dropoff: string; item: string; status: 'created' | 'offered' | 'assigned' | 'picked_up' | 'delivered' }

export const DEMO_CODE = '*384*7426#' // placeholder shared USSD code

const store = {
  business: { name: "Mama Achieng's Kitchen" } as { name: string } | null,
  rider: { name: 'Otieno', available: true },
  orders: [{ id: 41, dropoff: 'Ruiru site, gate B', item: '6x pilau + chapati', status: 'offered' }] as Order[],
  nextId: 42,
}

const con = (text: string): Reply => ({ text, done: false })
const end = (text: string): Reply => ({ text, done: true })

export function handle(text: string): Reply {
  const p = text ? text.split('*') : []
  if (p.length === 0) return con('Welcome to Motorida\n1. I am a Business\n2. I am a Rider')
  if (p[0] === '1') return business(p)
  if (p[0] === '2') return rider(p)
  return end('Invalid choice. Please dial again.')
}

function business(p: string[]): Reply {
  if (p.length === 1) return con('Business Menu\n1. Register my business\n2. Create a delivery request')
  if (p[1] === '1') {
    if (p.length === 2) return con('Enter your business name:')
    if (p.length === 3) return con('Enter your M-Pesa phone number (for your weekly Motorida bill):')
    if (p.length === 4) return con('Enter your pickup landmark:')
    if (p.length === 5) {
      store.business = { name: p[2] }
      return end(`Business "${p[2]}" registered! You can now create delivery requests.`)
    }
  }
  if (p[1] === '2') {
    if (!store.business) return end('No business registered on this number. Register first.')
    if (p.length === 2) return con('Enter customer phone number:')
    if (p.length === 3) return con('Enter dropoff landmark:')
    if (p.length === 4) return con('Enter item description:')
    if (p.length === 5) {
      const id = store.nextId++
      store.orders.push({ id, dropoff: p[3], item: p[4], status: 'created' })
      return end(`Delivery request #${id} created (cash on delivery). Our team will dispatch a rider shortly.`)
    }
  }
  return end('Invalid choice. Please dial again.')
}

function rider(p: string[]): Reply {
  if (p.length === 1)
    return con('Rider Menu\n1. Register\n2. Toggle available\n3. Accept/reject job offer\n4. Confirm pickup\n5. Confirm delivery')
  const r = store.rider
  const find = (s: Order['status']) => store.orders.find((o) => o.status === s)

  switch (p[1]) {
    case '1':
      return end(`This phone number is already registered as a rider.`)
    case '2':
      r.available = !r.available
      return end(`You are now ${r.available ? 'AVAILABLE' : 'UNAVAILABLE'} for jobs.`)
    case '3': {
      const job = find('offered')
      if (!job) return end('No pending job offers right now.')
      if (p.length === 2) return con(`Job #${job.id}: dropoff at ${job.dropoff}, item: ${job.item}\n1. Accept\n2. Reject`)
      if (p[2] === '1') return (job.status = 'assigned'), end(`Job #${job.id} accepted. Head to pickup.`)
      if (p[2] === '2') return (job.status = 'created'), end(`Job #${job.id} rejected.`)
      break
    }
    case '4': {
      const job = find('assigned')
      if (!job) return end('No assigned job to confirm pickup for.')
      job.status = 'picked_up'
      return end(`Pickup confirmed for job #${job.id}. Deliver to ${job.dropoff}.`)
    }
    case '5': {
      const job = find('picked_up')
      if (!job) return end('No picked-up job to confirm delivery for.')
      if (p.length === 2) return con('Enter amount collected (KES):')
      const amount = Number(p[2])
      if (!amount || amount <= 0) return end('Invalid amount. Please dial again.')
      job.status = 'delivered'
      return end(`Delivery and payment confirmed for job #${job.id}. Thank you!`)
    }
  }
  return end('Invalid choice. Please dial again.')
}

// What the ops dispatcher would do a few seconds after a business order lands:
// match a rider and SMS both sides. Returns the SMS the business receives.
export function dispatchLatest(): string | null {
  const job = [...store.orders].reverse().find((o) => o.status === 'created')
  if (!job) return null
  job.status = 'offered'
  return `Motorida: Rider Otieno (KMFB 482C) is on the way for order #${job.id}. Call 0711 000 000 with any issue.`
}
