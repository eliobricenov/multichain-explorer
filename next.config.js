/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
