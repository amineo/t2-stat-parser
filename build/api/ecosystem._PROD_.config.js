module.exports = {
	apps: [
		{
			cwd: '/opt/node_app/app/',
			script: 'node dist/main --interpreter bash',
			autorestart: true,
			instances: 1
		}
	]
};
