// Section: Footer
import Icon from './Icon'

export default function Footer() {
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
          <p className="mt-2 text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <h3 className="font-medium">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {['Home', 'About', 'Courses', 'Pages', 'Blog', 'Contact'].map((link) => (
              <li key={link}>
                <a
                  href="#"
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
      <div className="border-t border-line py-4 text-center text-sm">© 2024 MinuteZen</div>
    </footer>
  )
}
