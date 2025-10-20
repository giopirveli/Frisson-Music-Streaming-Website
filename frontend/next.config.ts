const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.resolve.alias['@styles'] = path.join(__dirname, 'src/styles');
    return config;
  },
};
