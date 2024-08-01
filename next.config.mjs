/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: undefined,
        pathname: undefined,
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
