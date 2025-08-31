// Section: Header
import Link from 'next/link'
import Icon from './Icon'

export default function Header() {
  const nav = [
    { name: 'Accueil', href: '/' },
    { name: 'Ressources gratuites', href: '/ressources-gratuites' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]
  return (
    <header className="border-line bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Icon name="lotus" className="w-6 h-6" />
          <span className="font-semibold">MinuteZen</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="md:hidden text-sm">Menu</span>
          <a
            href="/pack-audio"
            className="hidden md:inline-flex items-center gap-1 rounded-full border border-ink px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
          >
            Découvrir les cours
            <Icon name="arrow-up-right" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
