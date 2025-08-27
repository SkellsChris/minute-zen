// Section: Footer
import Icon from './Icon'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="mt-20 border-t border-line" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="lotus" className="h-6 w-6" />
            <span className="font-semibold">MinuteZen</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Votre pause bien-être en 5 minutes, où que vous soyez.</p>
        </div>
        <div>
          <h3 className="font-medium">Nos guides</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {['Home', 'About', 'Courses', 'Pages', 'Blog', 'Contact'].map((link) => (
              <li key={link}>
                <a
                  href={link === 'Contact' ? '/contact' : '#'}
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium">Newsletter</h3>
          <form className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded border border-line px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
            />
            <button
              type="submit"
              className="rounded bg-ink px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-sm">
        <nav aria-label="Pages légales">
          <ul className="flex flex-wrap justify-center gap-4 list-none p-0 m-0">
            <li>
              <a
                href="/mentions-legales"
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
              >
                Mentions légales
              </a>
            </li>
            <li>
              <a
                href="/politique-cookies"
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
              >
                Politique cookies
              </a>
            </li>
            <li>
              <a
                href="/politique-confidentialite"
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
              >
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </nav>
        <p className="mt-2">© {currentYear} MinuteZen</p>
      </div>
    </footer>
  )
}
