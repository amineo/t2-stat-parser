module.exports = {
	apps: [
		{
			name: process.env.APP_NAME,
			cwd: '/opt/node_app/app/',
			script: 'npm run start:dev --interpreter bash',
			// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: [ 'node_modules', 'dist' ]
		}
	]
};
