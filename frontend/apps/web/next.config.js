
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    transpilePackages: ["ui"],
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  transpilePackages: ["editor"],
};

module.exports = nextConfig;
