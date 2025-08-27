// Section: Courses
import Image from 'next/image'

const courses = [
  {
    title: 'Morning Flow',
    text: 'Votre pause bien-être en 5 minutes, où que vous soyez.',
    img: '/nutrition & energie zen.webp',
  },
  {
    title: 'Evening Calm',
    text: 'Votre pause bien-être en 5 minutes, où que vous soyez.',
    img: '/productivite & stress.webp',
  },
  {
    title: 'Mindful Breathing',
    text: 'Votre pause bien-être en 5 minutes, où que vous soyez.',
    img: '/respiration & relaxation.webp',
  },
  {
    title: 'Deep Stretch',
    text: 'Votre pause bien-être en 5 minutes, où que vous soyez.',
    img: '/yoga & mouvements rapides.webp',
  },
]

export default function Courses() {
  return (
    <section className="py-20" aria-labelledby="courses-heading">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 id="courses-heading" className="text-3xl font-bold">
          Explore our Yoga &amp; Meditation Course Collection.
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600">
          Faites une micro-séance de 3 à 5 minutes pour détendre le corps, calmer le mental et repartir concentré.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <a
              key={c.title}
              href="#"
              className="group block overflow-hidden rounded-lg border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink hover:shadow-lg"
            >
              <div className="relative aspect-square">
                <Image src={c.img} alt={c.title} fill className="object-cover" />
              </div>
              <div className="p-4 text-left">
                <h3 className="font-medium group-hover:underline">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
