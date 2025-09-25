# Minute Zen

This project is built with [Next.js](https://nextjs.org/) and Tailwind CSS.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run lint checks:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Environment Variables

Configure the following variables to enable form submissions:

| Variable | Description |
| --- | --- |
| `SMTP_HOST` | OVH/Roundcube SMTP host (e.g. `ssl0.ovh.net`). |
| `SMTP_PORT` | SMTP port, defaults to `465`. |
| `SMTP_SECURE` | Set to `false` to disable implicit TLS (defaults to `true`). |
| `SMTP_USERNAME` | SMTP account username. |
| `SMTP_PASSWORD` | SMTP account password. |
| `SMTP_FROM` | Email address used as envelope sender (defaults to `SMTP_USERNAME`). |
| `SMTP_FROM_NAME` | Optional display name for the From header. |
| `CONTACT_TO` | Comma-separated list of recipients for contact form submissions. |
| `SENDER_API` | Sender webhook endpoint used to subscribe Pack Audio leads to the `packaudio` automation. |

