const robots = `User-agent: *
Allow: /

Sitemap: https://tinylabpro.com/sitemap.xml
`;

export function GET() {
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
