"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";

type Feedback = { type: "success" | "error"; message: string };

export default function ContactForm(): JSX.Element {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const formEl = e.currentTarget;
      const data = new FormData(formEl);
      const getValue = (key: string) => {
        const v = data.get(key);
        return typeof v === "string" ? v.trim() : "";
      };

      // Honeypot anti-bot
      if (getValue("website")) {
        setIsSubmitting(false);
        return;
      }

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
        setFeedback({ type: "success", message: "Votre message a été envoyé." });
        formEl.reset();
      } else {
        let msg = "Une erreur est survenue lors de l'envoi.";
        if (body) {
          if (typeof body.error === "string") msg = body.error;
          else if (body.error && typeof body.error === "object") {
            try {
              const parts = Object.values(body.error as Record<string, string>);
              if (parts.length) msg = parts.join(" ");
            } catch {}
          } else if (body.message) {
            msg = String(body.message);
          }
        }
        setFeedback({ type: "error", message: msg });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Impossible de contacter le serveur. Réessayez plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot anti-bot (caché) */}
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
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
          placeholder="Écrivez votre message…"
        />
      </div>

      <div className="sm:col-span-2 mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          En envoyant ce message, vous acceptez notre{" "}
          <Link href="/mentions-legales" className="text-blue-700 hover:underline">
            politique de confidentialité
          </Link>.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {isSubmitting ? "Envoi…" : "Envoyer"}
        </button>
      </div>

      {feedback && (
        <p
          className={`sm:col-span-2 text-sm ${
            feedback.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback.message}
        </p>
      )}
    </form>
  );
}
