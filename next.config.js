/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // Add "hostname" key with the domain name
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
