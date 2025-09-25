"use client"

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function DownloadForm() {
  const [state, setState] = useState<FormState>('idle')

  return (
    <form
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault()
        setState('loading')
        const form = e.currentTarget
        const data = new FormData(form)
        const name = data.get('name') as string
        const email = data.get('email') as string

        try {
          const res = await fetch('/api/pack-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
          })

          if (!res.ok) {
            throw new Error('Failed to submit form')
          }

          setState('success')
          form.reset()
        } catch (err) {
          console.error('Unable to subscribe to pack audio', err)
          setState('error')
        }
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
          disabled={state === 'loading'}
          className="mt-2 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === 'loading' ? 'Envoi…' : 'Oui, je veux mes 5 audios gratuits'}
        </button>
      </div>
      {state === 'success' && (
        <p className="sm:col-span-2 text-sm text-emerald-600">
          Merci ! Vérifie ta boîte mail pour recevoir le pack.
        </p>
      )}
      {state === 'error' && (
        <p className="sm:col-span-2 text-sm text-red-600">
          Une erreur est survenue. Merci de réessayer plus tard.
        </p>
      )}
    </form>
  )
}
