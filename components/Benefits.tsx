// Section: Benefits
import Image from 'next/image'
import Icon, { IconName } from './Icon'

const items: { icon: IconName; title: string; text: string }[] = [
  { icon: 'mind', title: 'Stress Relief', text: 'Lorem ipsum dolor sit amet.' },
  { icon: 'sleep', title: 'Sleep', text: 'Lorem ipsum dolor sit amet.' },
  { icon: 'focus', title: 'Focus', text: 'Lorem ipsum dolor sit amet.' },
  { icon: 'mobility', title: 'Mobility', text: 'Lorem ipsum dolor sit amet.' },
  { icon: 'breath', title: 'Breath', text: 'Lorem ipsum dolor sit amet.' },
  { icon: 'spark', title: 'Energy', text: 'Lorem ipsum dolor sit amet.' },
]

export default function Benefits() {
  const left = items.slice(0, 3)
  const right = items.slice(3)
  return (
    <section className="py-20" aria-labelledby="benefits-heading">
      <h2 id="benefits-heading" className="sr-only">
        Benefits
      </h2>
      <div className="grid max-w-7xl mx-auto gap-12 px-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-8">
          {left.map((item) => (
            <BenefitItem key={item.title} align="left" {...item} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="relative p-6 bg-white rounded-lg shadow">
            <span className="absolute -z-10 inset-0 flex items-center justify-center">
              <span className="w-40 h-40 rounded-full bg-muted" />
            </span>
            <Image
              src="https://placehold.co/200x200"
              alt="Meditation pose"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {right.map((item) => (
            <BenefitItem key={item.title} align="right" {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitItem({ icon, title, text, align }: { icon: IconName; title: string; text: string; align: 'left' | 'right' }) {
  return (
    <div className={`relative flex items-start gap-4 ${align === 'right' ? 'lg:pl-8' : 'lg:pr-8'}`}>
      {align === 'right' && (
        <span className="hidden lg:block absolute right-full top-5 w-8 border-t border-dashed border-line" />
      )}
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
        <Icon name={icon} className="w-5 h-5" />
      </span>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
      {align === 'left' && (
        <span className="hidden lg:block absolute left-full top-5 w-8 border-t border-dashed border-line" />
      )}
    </div>
  )
}
