const withTM = require("next-transpile-modules")(["editor"]);

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
  }
};

module.exports = withTM(nextConfig);
