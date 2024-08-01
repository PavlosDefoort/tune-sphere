/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIENT_ID: "21ab1dc112ba47e1ad7657b408d0c3cf",
    CLIENT_SECRET: "",
    REDIRECT_URI: "http://localhost:3000/api/callback",
    JWT_SECRET: "supersecret",
  },
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
