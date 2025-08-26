// Section: Header
import Icon from './Icon'

export default function Header() {
  const nav = ['Home', 'About', 'Courses', 'Pages', 'Blog', 'Contact']
  return (
    <header className="border-line">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <Icon name="lotus" className="w-6 h-6" />
          <span className="font-semibold">MinuteZen</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          {nav.map((item) => (
            <a key={item} href="#" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="md:hidden text-sm">Menu</span>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-1 rounded-full border border-ink px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
          >
            Visiter le site
            <Icon name="arrow-up-right" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
