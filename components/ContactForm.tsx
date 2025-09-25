"use client"

import { useState } from 'react'
import Link from 'next/link'

type Feedback = { type: 'success' | 'error'; message: string }

export default function ContactForm() {
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <form
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault()
        setFeedback(null)
        setIsSubmitting(true)
        const form = e.currentTarget as HTMLFormElement
        const data = new FormData(form)
        const getValue = (key: string) => {
          const value = data.get(key)
          return typeof value === 'string' ? value : ''
        }
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: getValue('name'),
              email: getValue('email'),
              subject: getValue('subject'),
              message: getValue('message'),
            }),
          })

          const body = await res
            .json()
            .catch(() => ({ ok: res.ok, error: 'Réponse inattendue du serveur.' }))

          if (res.ok && body?.ok) {
            setFeedback({
              type: 'success',
              message: 'Votre message a été envoyé.',
            })
            form.reset()
          } else {
            const errorMessage = (() => {
              if (body && typeof body.error === 'string') {
                return body.error
              }
              if (body && body.error && typeof body.error === 'object') {
                return Object.values(body.error as Record<string, string>).join(' ')
              }
              return "Une erreur est survenue lors de l'envoi."
            })()
            setFeedback({ type: 'error', message: errorMessage })
          }
        } catch (err) {
          setFeedback({
            type: 'error',
            message: 'Impossible de contacter le serveur. Réessayez plus tard.',
          })
        } finally {
          setIsSubmitting(false)
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
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {isSubmitting ? 'Envoi…' : 'Envoyer'}
        </button>
      </div>
      {feedback && (
        <p
          className={`sm:col-span-2 text-sm ${
            feedback.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback.message}
        </p>
      )}
    </form>
  )
}
