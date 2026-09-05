import type { NextConfig } from 'next';

/* 安全响应头不在这里配：vinext 不实现 next.config 的 headers()，写了也不会生效。
 * 见 middleware.ts。 */
const nextConfig: NextConfig = {};

export default nextConfig;
