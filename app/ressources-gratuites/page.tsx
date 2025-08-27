import TopStrip from '../../components/TopStrip'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Ressources gratuites – MinuteZen',
}

type Resource = {
  id: string
  title: string
  subtitle?: string
  description: string
  lessons: number
  rating: number
  ratingCount: number
  badge: 'Free' | 'Plus'
  badgeTone: 'emerald' | 'amber'
  // Utilise une image si tu en as (ex: /images/ressources/chatgpt-for-everyone.jpg)
  image?: string
  // Fallback visuel si pas d’image
  gradientFrom: string
  gradientTo: string
}

const resources: Resource[] = [
  {
    id: 'chatgpt-everyone',
    title: 'ChatGPT for Everyone',
    subtitle: 'Created in collaboration with OpenAI',
    description:
      "Discover how to use ChatGPT effectively and explore the exciting world of Generative AI. No prior experience required!",
    lessons: 25,
    rating: 4.8,
    ratingCount: 409,
    badge: 'Free',
    badgeTone: 'emerald',
    // image: '/images/ressources/chatgpt-for-everyone.jpg',
    gradientFrom: 'from-slate-700',
    gradientTo: 'to-slate-900',
  },
  {
    id: 'intro-prompt-engineering',
    title: 'Introduction to Prompt Engineering',
    description:
      'Learn the fundamentals of prompt engineering and how LLMs interpret inputs to craft effective instructions.',
    lessons: 12,
    rating: 4.7,
    ratingCount: 43,
    badge: 'Plus',
    badgeTone: 'amber',
    // image: '/images/ressources/intro-prompt.jpg',
    gradientFrom: 'from-zinc-700',
    gradientTo: 'to-gray-900',
  },
  {
    id: 'advanced-prompt-engineering',
    title: 'Advanced Prompt Engineering',
    description:
      'Master advanced techniques to enhance accuracy, reliability, and efficiency of AI-generated responses.',
    lessons: 34,
    rating: 4.9,
    ratingCount: 39,
    badge: 'Plus',
    badgeTone: 'amber',
    // image: '/images/ressources/advanced-prompt.jpg',
    gradientFrom: 'from-black',
    gradientTo: 'to-slate-900',
  },
]

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${filled ? 'fill-yellow-400' : 'fill-gray-300'}`}
    >
      <path d="M10 15.27l-5.18 3.04 1.4-5.96L1 7.96l6.09-.52L10 1.5l2.91 5.94 6.09.52-5.22 4.39 1.4 5.96L10 15.27z" />
    </svg>
  )
}

function StarRating({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  return (
    <div className="flex items-center gap-1" aria-label={`Note ${value} sur 5`}>
      {stars.map((n) => (
        <Star key={n} filled={value >= n - 0.25} />
      ))}
      <span className="ml-1 text-sm text-gray-600">{value.toFixed(1)}</span>
    </div>
  )
}

function Badge({ tone, children }: { tone: Resource['badgeTone']; children: React.ReactNode }) {
  const tones: Record<Resource['badgeTone'], string> = {
    emerald: 'bg-emerald-600 text-white',
    amber: 'bg-amber-500 text-black',
  }
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow ${tones[tone]}`}>
      {children}
    </span>
  )
}

export default function RessourcesGratuites() {
  return (
    <>
      <TopStrip />
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            📚 Ressources gratuites – MinuteZen
          </h1>
          <p className="mt-3 text-gray-600">
            Explore des cours et guides pour progresser avec l’IA et la productivité.
            Sélection régulière de contenus de qualité — certains gratuits, d’autres pour abonnés Plus.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <article
              key={r.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              {/* Image / Hero */}
              <div className="relative">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  {r.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-br ${r.gradientFrom} ${r.gradientTo}`}
                    />
                  )}
                </div>

                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <Badge tone={r.badgeTone}>{r.badge}</Badge>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3 p-5">
                {r.subtitle ? (
                  <p className="text-xs uppercase tracking-wide text-gray-500">{r.subtitle}</p>
                ) : null}
                <h3 className="text-lg font-semibold text-gray-900">{r.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{r.description}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <StarRating value={r.rating} />
                  <span className="text-sm text-gray-500">({r.ratingCount})</span>
                </div>
                <div className="text-sm text-gray-600">{r.lessons} Lessons</div>
              </div>
            </article>
          ))}
        </section>

        {/* CTA secondaire */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
          >
            Voir toutes les ressources
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}
