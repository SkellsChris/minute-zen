import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
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

              <form
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  // Ouvre un email pré-rempli; remplace si tu branches un backend
                  const form = e.currentTarget as HTMLFormElement
                  const data = new FormData(form)
                  const name = data.get('name') as string
                  const email = data.get('email') as string
                  const subject = data.get('subject') as string
                  const message = data.get('message') as string
                  const mailto = `mailto:contact@minutezen.fr?subject=${encodeURIComponent(
                    subject || 'Message MinuteZen'
                  )}&body=${encodeURIComponent(
                    `Nom: ${name}\nEmail: ${email}\n\n${message}`
                  )}`
                  window.location.href = mailto
                }}
              >
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-800">Nom</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-blue-400"
                    placeholder="Votre nom"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-800">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                    placeholder="vous@exemple.com"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-800">Objet</label>
                  <input
                    name="subject"
                    type="text"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-800">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                    placeholder="Écrivez votre message…"
                  />
                </div>

                <div className="sm:col-span-2 mt-2 flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    En envoyant ce message, vous acceptez notre{' '}
                    <Link href="/mentions-legales" className="text-blue-700 hover:underline">
                      politique de confidentialité
                    </Link>.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
