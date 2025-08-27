// Section: TopStrip
import Icon from './Icon'

export default function TopStrip() {
  return (
    <div className="h-10 bg-muted">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="lotus" className="w-5 h-5" />
          <span>MinuteZen</span>
        </div>
        <a
          href="/ressources-gratuites"
          className="text-sm underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
        >
          Découvrir les cours
        </a>
      </div>
    </div>
  )
}
