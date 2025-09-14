"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  return (
    <form
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault()
        setSent(false)
        setError(false)
        const form = e.currentTarget as HTMLFormElement
        const data = new FormData(form)
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.get('name'),
            email: data.get('email'),
            subject: data.get('subject'),
            message: data.get('message'),
          }),
        })
        if (res.ok) {
          setSent(true)
          form.reset()
        } else {
          setError(true)
        }
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
      {sent && (
        <p className="sm:col-span-2 text-sm text-green-600">Votre message a été envoyé.</p>
      )}
      {error && (
        <p className="sm:col-span-2 text-sm text-red-600">Une erreur est survenue.</p>
      )}
    </form>
  )
}
