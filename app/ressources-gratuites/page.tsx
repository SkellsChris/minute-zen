import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Ressources gratuites – MinuteZen',
}

export default function RessourcesGratuites() {
  return (
    <>
      <TopStrip />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 prose">
        <h1>📚 Ressources gratuites – MinuteZen</h1>
        <p>Découvrez prochainement notre sélection de ressources gratuites pour vous accompagner dans votre pratique.</p>
      </main>
      <Footer />
    </>
  )
}
