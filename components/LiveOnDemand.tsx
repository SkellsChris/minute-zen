// Section: LiveOnDemand
import Icon, { IconName } from './Icon'

const categories: { icon: IconName; label: string }[] = [
  { icon: 'spark', label: 'Energy' },
  { icon: 'mind', label: 'Mind-Body' },
  { icon: 'sleep', label: 'Sleep' },
  { icon: 'breath', label: 'Breath' },
  { icon: 'focus', label: 'Focus' },
  { icon: 'mobility', label: 'Mobility' },
]

export default function LiveOnDemand() {
  return (
    <section className="bg-muted py-20" aria-labelledby="live-heading">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 id="live-heading" className="text-3xl font-bold">
          Live &amp; On-Demand
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Faites une micro-séance de 3 à 5 minutes pour détendre le corps, calmer le mental et repartir concentré.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {categories.map((c) => (
            <div key={c.label} className="flex w-20 flex-col items-center gap-2">
              <Icon name={c.icon} className="h-9 w-9" />
              <span className="text-xs">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
