/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The bare apex is kept only so it resolves at all — www is canonical.
    // Handled here rather than at the DNS/Cloudflare layer so it survives
    // any future domain reshuffle.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "charlieva.dev" }],
        destination: "https://www.charlieva.dev/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
