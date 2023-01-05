const withTM = require("next-transpile-modules")(["editor"]);

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    transpilePackages: ["ui"],
  },
};

module.exports = withTM(nextConfig);
