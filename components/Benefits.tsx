// Section: Benefits (responsive)
import Image from 'next/image'
import Icon, { IconName } from './Icon'

type Item = { icon: IconName; title: string; text: string }

const items: Item[] = [
  { icon: 'mind',   title: 'Stress Reduction',                   text: 'Apaisement rapide en quelques minutes.' },
  { icon: 'sleep',  title: 'Improved Mental Health',             text: 'Allégez tensions et charge mentale.' },
  { icon: 'focus',  title: 'Flexibility & Physical Strength',    text: 'Bougez mieux, respirez mieux.' },
  { icon: 'mobility', title: 'Mind–Body Connection',             text: 'Reliez souffle et posture.' },
  { icon: 'breath', title: 'Energy & Vitality',                  text: 'Relancez l’énergie sans café.' },
  { icon: 'spark',  title: 'Concentration & Focus',              text: 'Clarté mentale instantanée.' },
]

// utilitaire: coupe en 2 colonnes égales
const left  = items.slice(0, 3)
const right = items.slice(3)

export default function Benefits() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="benefits-heading">
      <h2 id="benefits-heading" className="sr-only">Benefits</h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* MOBILE/TABLET: image top + grid 2 colonnes */}
        <div className="lg:hidden">
          <div className="flex items-center justify-center">
            <CenterHero sizeClass="size-56 sm:size-72" imgW={340} imgH={340} />
          </div>

          {/* cartes en grille responsive */}
          <ul className="mt-10 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:gap-8">
            {items.map((it) => (
              <li key={it.title} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm/50">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-gray-200 bg-white">
                    <Icon name={it.icon} className="h-5 w-5 opacity-80" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">{it.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{it.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* DESKTOP: 3 colonnes avec connecteurs */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:gap-16">
          <ul className="space-y-12">
            {left.map((it) => (
              <li key={it.title}>
                <BenefitItem align="left" {...it} />
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center">
            <CenterHero sizeClass="size-80 2xl:size-96" imgW={420} imgH={420} />
          </div>

          <ul className="space-y-12">
            {right.map((it) => (
              <li key={it.title}>
                <BenefitItem align="right" {...it} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function CenterHero({ sizeClass, imgW, imgH }: { sizeClass: string; imgW: number; imgH: number }) {
  return (
    <div className="relative">
      {/* halo doux et responsive */}
      <div className={`absolute inset-0 -z-10 m-auto ${sizeClass} rounded-full bg-blue-50/90`} />
      <Image
        src="/meditation.png"
        alt="Meditation pose"
        width={imgW}
        height={imgH}
        className="drop-shadow-sm"
        priority
      />
    </div>
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
    <div className={`relative flex items-start gap-4 ${isRight ? 'justify-end pl-10' : 'pr-10'}`}>
      {/* icône côté extérieur */}
      {!isRight && (
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-gray-200 bg-white">
          <Icon name={icon} className="h-5 w-5 opacity-80" />
        </span>
      )}

      <div className={isRight ? 'text-right' : 'text-left'}>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 max-w-xs text-xs leading-relaxed text-gray-500">{text}</p>
      </div>

      {isRight && (
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-gray-200 bg-white">
          <Icon name={icon} className="h-5 w-5 opacity-80" />
        </span>
      )}

      {/* connecteur vers l’image (desktop only via conteneur lg) */}
      <span
        className={`pointer-events-none absolute top-5 hidden w-16 border-t border-dashed border-gray-300 lg:block ${
          isRight ? 'right-full' : 'left-full'
        }`}
      />
    </div>
  )
}
