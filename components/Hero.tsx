// Section: Hero
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-t-3xl" aria-labelledby="hero-heading">
      <div className="absolute inset-0">
        <Image
          src="/minute-zen.webp"
          alt="Meditation on the beach"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/30" />
      </div>
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 gap-6">
        <p className="text-sm uppercase tracking-wider">Harmonie du corps, apaisement de l’esprit.</p>
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
          Reset zen en 5 minutes
        </h1>
        <p className="max-w-md text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="flex gap-4">
          <a
            href="#"
            className="rounded-full bg-ink px-6 py-3 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
          >
            Commencer
          </a>
          <a
            href="#"
            className="rounded-full px-6 py-3 text-sm underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
          >
            Découvrir
          </a>
        </div>
      </div>
    </section>
  )
}
