const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@atoms": path.resolve(__dirname, "src/components/atoms"),
    "@molecules": path.resolve(__dirname, "src/components/molecules"),
    "@organizms": path.resolve(__dirname, "src/components/organizms"),
    "@custom-hooks": path.resolve(__dirname, "src/custom-hooks"),
    "@utils": path.resolve(__dirname, "src/utils"),
  };
  return config;
};
