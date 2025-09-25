// app/api/contact/route.ts
import nodemailer from 'nodemailer';
import isEmail from 'validator/lib/isEmail';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';        // ⚠️ impératif: pas d'Edge runtime
export const dynamic = 'force-dynamic'; // évite la mise en cache

/** ---- Utils ---- */
function getClientIp(request: Request) {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) {
    const [ip] = fwd.split(',').map((s) => s.trim()).filter(Boolean);
    if (ip) return ip;
  }
  return request.headers.get('cf-connecting-ip') || 'unknown';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeLineBreaks(value: string) {
  return value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

/** ---- Handler ---- */
export async function POST(request: Request) {
  const ip = getClientIp(request);

  // Parse JSON
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    console.log(`[contact] ip=${ip} status=400 subject="invalid-json"`);
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON payload.' },
      { status: 400 }
    );
  }

  // Extract + sanitize
  const { name, email, subject, message } = (payload || {}) as Record<string, unknown>;

  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedSubject = typeof subject === 'string' ? subject.trim() : '';
  const normalizedMessage =
    typeof message === 'string' ? normalizeLineBreaks(message.trim()) : '';

  const safeName = sanitizeHeader(trimmedName);
  const safeSubject = trimmedSubject ? sanitizeHeader(trimmedSubject) : '';
  const safeEmail = trimmedEmail.replace(/[\r\n]+/g, '');

  // Validation
  const errors: Record<string, string> = {};
  if (trimmedName.length < 2 || trimmedName.length > 80) {
    errors.name = 'Le nom doit contenir entre 2 et 80 caractères.';
  }
  if (!isEmail(trimmedEmail)) {
    errors.email = "L'adresse email est invalide.";
  }
  if (!trimmedSubject) {
    errors.subject = 'Le sujet est requis.';
  } else if (trimmedSubject.length > 120) {
    errors.subject = 'Le sujet doit contenir au maximum 120 caractères.';
  }
  if (normalizedMessage.length < 10 || normalizedMessage.length > 5000) {
    errors.message = 'Le message doit contenir entre 10 et 5000 caractères.';
  }
  if (Object.keys(errors).length > 0) {
    console.log(`[contact] ip=${ip} status=400 subject="${safeSubject || 'invalid'}"`);
    return NextResponse.json({ ok: false, error: errors }, { status: 400 });
  }

  // ENV (valeurs et défauts)
  const smtpHost = process.env.SMTP_HOST || 'ssl0.ovh.net';
  const envSecure = (process.env.SMTP_SECURE ?? 'true').toLowerCase();
  const smtpSecure = envSecure === 'true';                  // true => 465 ; false => 587
  const smtpPort = process.env.SMTP_PORT
    ? Number.parseInt(process.env.SMTP_PORT, 10)
    : (smtpSecure ? 465 : 587);

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // From doit appartenir au domaine (mailbox/alias OVH)
  const contactFrom = (process.env.CONTACT_FROM || smtpUser || '').trim();
  // To peut être une ou plusieurs adresses (séparées par des virgules)
  const contactTo = (process.env.CONTACT_TO || smtpUser || '').trim();
  const contactBcc = (process.env.CONTACT_BCC || '').trim();

  if (!smtpUser || !smtpPass || !contactFrom || !contactTo) {
    console.error('[contact][env] Missing SMTP_USER/SMTP_PASS/CONTACT_FROM/CONTACT_TO');
    return NextResponse.json(
      { ok: false, error: 'Email service is not configured correctly.' },
      { status: 500 }
    );
  }

  // Transporter Nodemailer
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,             // 465 = SSL; 587 = STARTTLS
    requireTLS: smtpSecure ? undefined : true,
    auth: { user: smtpUser, pass: smtpPass },
    tls: { minVersion: 'TLSv1.2' },
    // logger: true,                 // <-- décommente temporairement pour debug SMTP
  });

  // Vérifie la connexion/authentification
  try {
    await transporter.verify();
  } catch (error: any) {
    console.error('[contact][verify] error:', {
      code: error?.code,
      command: error?.command,
      response: error?.response,
      responseCode: error?.responseCode,
      message: error?.message,
    });
    return NextResponse.json(
      {
        ok: false,
        stage: 'verify',
        code: error?.code,
        command: error?.command,
        response: error?.response,
        responseCode: error?.responseCode,
        message: error?.message || 'Email service unavailable.',
      },
      { status: 503 }
    );
  }

  // Destinataires
  const recipients = contactTo
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const bccRecipients = contactBcc
    ? contactBcc.split(',').map((s) => s.trim()).filter(Boolean)
    : undefined;

  if (recipients.length === 0) {
    console.error('[contact] No recipients configured');
    return NextResponse.json(
      { ok: false, error: 'No recipients configured for contact emails.' },
      { status: 500 }
    );
  }

  // Corps du mail
  const textBody =
    `Nom: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${normalizedMessage}`;
  const htmlBody =
    `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,'Helvetica Neue',Arial,'Noto Sans',sans-serif;color:#0f172a;">
      <p><strong>Nom :</strong> ${escapeHtml(trimmedName)}</p>
      <p><strong>Email :</strong> ${escapeHtml(trimmedEmail)}</p>
      <p><strong>Message :</strong><br/>${escapeHtml(normalizedMessage).replace(/\n/g, '<br/>')}</p>
     </body></html>`;

  const subjectLine = `[MinuteZen • Contact] ${safeSubject} — from ${safeName}`;

  // Envoi
  try {
    const info = await transporter.sendMail({
      from: contactFrom,                        // ⚠️ doit appartenir à ta boîte/alias OVH
      to: recipients,
      bcc: bccRecipients && bccRecipients.length ? bccRecipients : undefined,
      replyTo: `${safeName} <${safeEmail}>`,    // répondre envoie au visiteur
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    });

    console.log(`[contact] ip=${ip} status=200 subject="${safeSubject}" id=${info.messageId}`);
    return NextResponse.json({ ok: true, messageId: info.messageId }, { status: 200 });
  } catch (error: any) {
    console.error('[contact][send] error:', {
      code: error?.code,
      command: error?.command,
      response: error?.response,
      responseCode: error?.responseCode,
      message: error?.message,
    });
    return NextResponse.json(
      {
        ok: false,
        stage: 'send',
        code: error?.code,
        command: error?.command,
        response: error?.response,
        responseCode: error?.responseCode,
        message: error?.message || 'Failed to send the email.',
      },
      { status: 500 }
    );
  }
}
