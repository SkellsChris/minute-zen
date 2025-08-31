import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DownloadForm from '../../components/DownloadForm'

export const metadata = {
  title: 'Pack Audio MinuteZen – MinuteZen',
  description:
    'Télécharge gratuitement 5 audios guidés (1–2 min) pour calmer ton stress, relâcher les tensions, rebooster ton énergie et t’endormir plus facilement.'
}

export default function PackAudio() {
  return (
    <>
      <div className="sticky top-0 z-[60] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <TopStrip />
      <Header />
      </div>

      {/* Background gradient */}
      <div className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[480px] bg-gradient-to-b from-emerald-100 via-white to-white"
        />

        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span>🎁 Gratuit</span>
              <span className="h-1 w-1 rounded-full bg-emerald-300" />
              <span>5 audios guidés • 1–2 min</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Calme ton esprit en 2 minutes
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-pretty text-lg text-gray-600">
              Un pack d’audios prêts à écouter pour <strong>apaiser le stress</strong>,
              <strong> libérer les tensions</strong> et <strong>retrouver de l’énergie</strong> au
              travail comme à la maison. Télécharge-les gratuitement et écoute-les partout.
            </p>
          </section>

          {/* Content grid: benefits + form */}
          <section className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: What you get + benefits */}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Ce que tu vas recevoir</h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  'Respiration anti-stress express – apaiser immédiatement',
                  'Relâcher épaules & nuque – dire adieu aux tensions',
                  'Micro-visualisation positive – retrouver confiance & clarté',
                  'Pause énergie au bureau – éviter le coup de fatigue',
                  'Endormissement rapide – glisser vers un sommeil profond'
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>

              {/* FAQ simple */}
              
            </div>

            {/* Right: Form card */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Télécharge le Pack Audio MinuteZen
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Reçois les 5 audios dans ta boîte mail + un mini guide d’utilisation.
                </p>

                <div className="mt-6">
                  <DownloadForm />
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  🔒 Tes données sont protégées. Pas de spam. Désinscription en un clic.
                </p>

                <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-medium">Ce pack est idéal si tu veux :</p>
                  <ul className="mt-2 list-disc pl-5">
                    <li>Un rituel rapide pour relâcher la pression entre deux tâches</li>
                    <li>Des consignes simples pour détendre épaules, nuque et esprit</li>
                    <li>Un coup de pouce pour t’endormir plus facilement</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Social proof / mini trust */}
          <section className="mt-16">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-sm text-gray-600">
                Déjà utilisé par des lecteurs qui veulent <strong>moins de stress</strong> et
                <strong> plus d’énergie</strong> au quotidien.
              </p>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  )
}
