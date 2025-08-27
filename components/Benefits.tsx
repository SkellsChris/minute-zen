// Section: Benefits (capture-2 style)
import Image from 'next/image'
import Icon, { IconName } from './Icon'

const items: { icon: IconName; title: string; text: string }[] = [
  { icon: 'mind', title: 'Stress Reduction', text: 'Adoptez un apaisement rapide et durable.' },
  { icon: 'sleep', title: 'Improved Mental Health', text: 'Allégez les tensions en quelques minutes.' },
  { icon: 'focus', title: 'Enhanced Flexibility & Strength', text: 'Bougez mieux, respirez mieux.' },
  { icon: 'mobility', title: 'Mind–Body Connection', text: 'Ancrez-vous, reliez souffle et posture.' },
  { icon: 'breath', title: 'Increased Energy & Vitality', text: 'Relancez l’énergie sans café.' },
  { icon: 'spark', title: 'Enhanced Concentration & Focus', text: 'Clarté mentale en un instant.' },
]

// keep 3 items left / 3 right
const left = items.slice(0, 3)
const right = items.slice(3)

export default function Benefits() {
  return (
    <section className="py-20" aria-labelledby="benefits-heading">
      <h2 id="benefits-heading" className="sr-only">Benefits</h2>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-3 lg:gap-16">
        {/* LEFT COLUMN */}
        <ul className="order-2 space-y-12 lg:order-1">
          {left.map((item) => (
            <li key={item.title}>
              <BenefitItem align="left" {...item} />
            </li>
          ))}
        </ul>

        {/* CENTER IMAGE WITH HALO */}
        <div className="order-1 flex items-center justify-center lg:order-2">
          <div className="relative">
            <div className="absolute inset-0 -z-10 m-auto size-80 rounded-full bg-blue-50/90 blur-[0.5px]" />
            <Image
              src="/meditation.png"
              alt="Meditation pose"
              width={420}
              height={420}
              className="drop-shadow-sm"
              priority
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <ul className="order-3 space-y-12">
          {right.map((item) => (
            <li key={item.title}>
              <BenefitItem align="right" {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function BenefitItem({
  icon,
  title,
  text,
  align,
}: {
  icon: IconName
  title: string
  text: string
  align: 'left' | 'right'
}) {
  const isRight = align === 'right'

  return (
    <div
      className={[
        'relative flex items-start gap-4',
        isRight ? 'justify-end lg:pl-10' : 'lg:pr-10',
      ].join(' ')}
    >
      {/* Outer icon (stays at the outer edge) */}
      {isRight ? null : (
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-gray-200 bg-white">
          <Icon name={icon} className="h-5 w-5 opacity-80" />
        </span>
      )}

      {/* Text block */}
      <div className={isRight ? 'text-right' : 'text-left'}>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 max-w-xs text-xs leading-relaxed text-gray-500">{text}</p>
      </div>

      {isRight ? (
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-gray-200 bg-white">
          <Icon name={icon} className="h-5 w-5 opacity-80" />
        </span>
      ) : null}

      {/* Dashed connector toward the center circle */}
      <span
        className={[
          'pointer-events-none absolute top-5 hidden w-16 border-t border-dashed border-gray-300 lg:block',
          isRight ? 'right-full' : 'left-full',
        ].join(' ')}
      />
    </div>
  )
}
