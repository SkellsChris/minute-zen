"use client"

export default function DownloadForm() {
  return (
    <form
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const name = data.get('name') as string
        const email = data.get('email') as string
        const mailto = `mailto:contact@minutezen.fr?subject=${encodeURIComponent('Pack Audio MinuteZen')}&body=${encodeURIComponent(`Prénom: ${name}\nEmail: ${email}`)}`
        window.location.href = mailto
      }}
    >
      <div>
        <label className="block text-sm font-medium text-slate-800">Prénom</label>
        <input
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
          placeholder="Ton prénom"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-800">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
          placeholder="toi@exemple.com"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Oui, je veux mes 5 audios gratuits
        </button>
      </div>
    </form>
  )
}
