import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Contact – MinuteZen',
}

export default function Contact() {
  return (
    <>
      <TopStrip />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 prose">
        <h1>📬 Contact – MinuteZen</h1>
        <p>Une question, une remarque ? N'hésitez pas à nous contacter :</p>
        <ul>
          <li>Email : <a href="mailto:contact@minutezen.fr">contact@minutezen.fr</a></li>
        </ul>
      </main>
      <Footer />
    </>
  )
}
