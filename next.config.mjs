/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // googleapis is server-only; keep it out of the client bundle.
  experimental: {
    serverComponentsExternalPackages: ["googleapis"],
  },
};

export default nextConfig;
