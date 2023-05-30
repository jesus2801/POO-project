/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  trailingSlash: true,
  output: "export",
};

module.exports = nextConfig;
