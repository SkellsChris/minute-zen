import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm'
import Link from 'next/link'

export const metadata = {
  title: 'Contact – MinuteZen',
}

export default function Contact() {
  return (
    <>
      <TopStrip />
      <Header />

      {/* Mini hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-blue-700/70">Nous écrire</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            📬 Contact – MinuteZen
          </h1>
          <p className="mt-3 text-slate-600">
            Une question, une idée, un partenariat ? Nous répondons rapidement.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact card */}
          <aside className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Coordonnées</h2>
              <p className="mt-2 text-slate-600">
                Le moyen le plus simple et le plus rapide pour nous joindre.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href="mailto:contact@minutezen.fr"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    ✉️
                  </span>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Email</div>
                    <div className="text-sm text-slate-600 group-hover:underline">
                      contact@minutezen.fr
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    ⏱️
                  </span>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Délais de réponse</div>
                    <div className="text-sm text-slate-600">Sous 24–48h ouvrées</div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="text-sm font-medium text-slate-900">Ressources utiles</div>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>
                      <Link href="/mentions-legales" className="text-blue-700 hover:underline">
                        Mentions légales & Confidentialité
                      </Link>
                    </li>
                    <li>
                      <Link href="/politique-cookies" className="text-blue-700 hover:underline">
                        Politique cookies
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Envoyer un message</h2>
              <p className="mt-2 text-slate-600">
                Remplissez ce formulaire, nous revenons vers vous par email.
              </p>

              <ContactForm />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
