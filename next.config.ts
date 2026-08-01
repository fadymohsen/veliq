import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://framerusercontent.com; font-src 'self'; connect-src 'self'; " +
      // Project case-study pages embed live client sites in device mockups —
      // without frame-src, CSP falls back to default-src 'self' and silently
      // blocks every one of those iframes (looks like "broken" mockup photos).
      "frame-src 'self' https://www.alfatransport.sa https://www.yamin.estate https://www.saudihayat.com https://www.fanousclinic.com https://www.initio.sa https://www.redbonegym.com https://captainmagedcm.com https://www.coachbatool.com https://www.coachmohamedroshdy.com https://windowadv.com https://enjazcare.sa https://www.brandlabagency.co; " +
      "frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Serve local /public images as-is instead of routing them through
    // Vercel's paid image-optimization pipeline. That pipeline was 402'ing
    // (quota exhausted) on the project screenshots, breaking them in prod.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
