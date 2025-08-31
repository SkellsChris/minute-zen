// Section: BottomCta
import Icon from './Icon'

export default function BottomCta() {
  return (
    <section className="py-20" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-start gap-6 rounded-xl bg-ink p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div className="flex items-center gap-3">
            <Icon name="lotus" className="h-8 w-8" />
            <h2 id="cta-heading" className="text-2xl font-semibold">
              Découvrir les cours
            </h2>
          </div>
          <a
            href="/pack-audio"
            className="rounded-full bg-white px-6 py-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          >
            Découvrir les cours
          </a>
        </div>
      </div>
    </section>
  )
}
