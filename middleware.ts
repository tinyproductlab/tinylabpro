import { NextResponse } from 'next/server';

/* 安全响应头。
 *
 * 为什么在这里，而不是 public/_headers 或 next.config.ts：
 *   - public/_headers 只作用于 Workers Assets 的**静态资源**响应
 *     （图片的一周缓存那几条确实生效了），管不到服务端渲染出来的 HTML；
 *   - vinext 没有实现 next.config 的 headers()，写了静默失效。
 * middleware 是这套组合里唯一能给 HTML 响应加头的地方。 */
const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // 天气组件需要定位，保留 self；其余能力一律关闭
  'Permissions-Policy': 'geolocation=(self), camera=(), microphone=(), payment=(), usb=()',
  'X-Frame-Options': 'SAMEORIGIN',
};

export function middleware() {
  const response = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: '/:path*',
};
