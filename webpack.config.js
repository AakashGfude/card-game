var path = require('path');
module.exports = function(env) {
  const webpackConfigPath = path.resolve(__dirname,'config',`webpack.${env}.js`);
  const webpackConfig = require(webpackConfigPath)(env);
  return webpackConfig;
}
