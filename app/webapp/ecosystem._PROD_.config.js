module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: 'server.js',
      autorestart: true,
      instances: 1
    }
  ]
};
