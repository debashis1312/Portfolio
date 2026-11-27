const path = require("node:path");

module.exports = {
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname, "..") },
};
