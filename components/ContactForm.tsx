"use client";

import { useState } from "react";
import Link from "next/link";

type Feedback = { type: "success" | "error"; message: string };

export default function ContactForm() {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        setFeedback(null);
        setIsSubmitting(true);

        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const getValue = (key: string) => {
          const value = data.get(key);
          return typeof value === "string" ? value.trim() : "";
        };

        // honeypot anti-bot (champ caché)
        if (getValue("website")) {
          setIsSubmitting(false);
          return; // bot probable, on ignore
        }

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: getValue("name"),
              email: getValue("email"),
              subject: getValue("subject"),
              message: getValue("message"),
            }),
          });

          const body = await res
            .json()
            .catch(() => ({ ok: res.ok, error: "Réponse inattendue du serveur." }));

          if (res.ok && body?.ok) {
            setFeedback({
              type: "success",
              message: "Votre message a été envoyé.",
            });
            form.reset();
          } else {
            // essaie d’afficher l’erreur renvoyée par l’API (ex: champs invalides)
            let errorMessage = "Une erreur est survenue lors de l'envoi.";
            if (body) {
              if (typeof body.error === "string") errorMessage = body.error;
              else if (body.error && typeof body.error === "object") {
                try {
                  const parts = Object.values(body.error as Record<string, string>);
                  if (parts.length) errorMessage = parts.join(" ");
                } catch {}
              } else if (body.message) {
                errorMessage = body.message as string;
              }
              // messages techniques utiles en debug (non affichés à l’utilisateur)
              if (process.env.NODE_ENV !== "production" && (body.code || body.stage)) {
                // eslint-disable-next-line no-console
                console.warn("API /contact error:", body);
              }
            }
            setFeedback({ type: "error", message: errorMessage });
          }
        } catch {
          setFeedback({
            type: "error",
            message: "Impossible de contacter le serveur. Réessayez plus tard.",
          });
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {/* Honeypot anti-bot (caché aux humains) */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="sm:col-span-1">
        <label className="block text-sm font-medium text-slate-800">Nom</label>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
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
          required
          maxLength={120}
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
          minLength={10}
          maxLength={5000}
          className="mt-1 w-full rounded-xl b
