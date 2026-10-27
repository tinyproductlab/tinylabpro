const FILES: Record<string, { contentType: string; download: boolean }> = {
  "/dl/NConvo-1.0.0.apk": { contentType: "application/vnd.android.package-archive", download: true },
  "/dl/NConvo-macOS-arm64.zip": { contentType: "application/zip", download: true },
  "/dl/NConvo-Windows-x64.zip": { contentType: "application/zip", download: true },
  "/dl/desktop-version.json": { contentType: "application/json", download: false },
};

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const file = FILES[url.pathname];
    if (!file) {
      return new Response("Not found", { status: 404 });
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }
    const filename = url.pathname.split("/").pop() as string;
    const headers = new Headers();
    for (const name of ["Range", "If-Range", "If-None-Match", "If-Modified-Since"]) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }
    // Stream from the owner's server; do not store packages in Workers or edge cache.
    const upstream = await fetch("https://unmark.tinylabpro.com" + url.pathname, {
      method: request.method,
      headers,
      redirect: "manual",
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set("Cache-Control", "no-store");
    responseHeaders.set("X-Content-Type-Options", "nosniff");
    if (upstream.ok) {
      responseHeaders.set("Content-Type", file.contentType);
      if (file.download) {
        responseHeaders.set("Content-Disposition", `attachment; filename="${filename}"`);
      }
    }
    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  },
} satisfies ExportedHandler;
