export async function GET() {
  return Response.json({
    siteUrl: process.env.SITE_URL ?? '',
    defaultLocale: process.env.DEFAULT_LOCALE ?? 'fr',
  });
}
