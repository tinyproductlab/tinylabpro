const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tinylabpro.com</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url><loc>https://tinylabpro.com/about</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://tinylabpro.com/contact</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://tinylabpro.com/privacy</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://tinylabpro.com/terms</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://tinylabpro.com/disclaimer</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
</urlset>`;

export function GET() {
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
