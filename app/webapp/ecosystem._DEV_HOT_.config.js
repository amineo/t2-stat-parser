module.exports = {
  apps : [{
    name: process.env.APP_NAME,
    script: 'server.js',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch:['node_modules','public','resources/js','resources/scss']
  },
  {
    name: process.env.APP_NAME + '_react_hot',
    script: 'node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1,
    autorestart: false,
    watch: false,
  }]
};
