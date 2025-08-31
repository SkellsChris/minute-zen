import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import DownloadForm from '../../components/DownloadForm'

export const metadata = {
  title: 'Pack Audio MinuteZen – MinuteZen',
}

export default function PackAudio() {
  return (
    <>
      <TopStrip />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <section className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Calme ton esprit en 5 minutes – Télécharge gratuitement ton Pack Audio MinuteZen
          </h1>
          <p className="mt-4 text-gray-600">
            Stress, fatigue, pensées qui tournent en boucle ? Avec ce pack gratuit de 5 audios guidés, découvre des exercices simples et efficaces pour retrouver ton calme, libérer les tensions et recharger ton énergie… en seulement quelques minutes par jour.
          </p>
          <div className="mt-8 flex justify-center">
            <Image src="/pack-audio-mockup.svg" alt="Pack Audio MinuteZen" width={240} height={240} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">Ce que tu vas recevoir</h2>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>🎧 Respiration anti-stress express – pour apaiser ton esprit immédiatement</li>
            <li>🎧 Relâcher les épaules et la nuque – fini les tensions physiques accumulées</li>
            <li>🎧 Micro-visualisation positive – retrouver confiance et clarté mentale</li>
            <li>🎧 Pause énergie au bureau – recharge rapide pour éviter le coup de fatigue</li>
            <li>🎧 Endormissement rapide – glisser vers un sommeil profond et réparateur</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">Télécharge ton Pack Audio MinuteZen gratuitement</h2>
          <DownloadForm />
        </section>

        <section className="mt-12">
          <ul className="space-y-3 text-gray-700">
            <li>⏱️ Des pauses courtes, 4–5 minutes seulement</li>
            <li>🎧 Faciles à écouter partout : téléphone, bureau, lit</li>
            <li>💡 Techniques validées par la science de la respiration et de la relaxation</li>
            <li>🧘 Pas de bla-bla, juste l’essentiel pour retrouver ton équilibre</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
