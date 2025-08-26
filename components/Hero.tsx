// Section: Hero
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-t-3xl" aria-labelledby="hero-heading">
      <div className="absolute inset-0">
        <Image
          src="/minute%20zen.webp"
          alt="Minute Zen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/30" />
      </div>
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 gap-6">
        <p className="text-sm uppercase tracking-wider">Daily Yoga &amp; Meditation</p>
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
          HARMONY OF BODY, PEACE OF MIND.
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
        <div className="relative mt-10">
          <div className="absolute -inset-x-10 bottom-0 top-10 bg-gradient-to-r from-blue-100 to-transparent blur-3xl rounded-full" />
          <Image
            src="https://placehold.co/300x300"
            alt="Person meditating"
            width={300}
            height={300}
            className="relative z-10"
          />
        </div>
      </div>
    </section>
  )
}
