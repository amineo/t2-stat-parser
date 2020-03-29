#!/bin/bash

echo "Node ENV: $NODE_ENV"

file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

file_env 'APP_KEY'


# Exit if APP_KEY is missing, this key is important!
if [ -z "$APP_KEY" ]
then
	echo >&2 "[ERROR] No ENV for APP_KEY or APP_KEY_FILE found!"
	echo >&2 "Run the ./generate-adonis-app-key.sh script or provide one at runtime"
	exit 1
fi




if [[ "$NODE_ENV" == "development" ]]; then
	echo "Prepping container for dev environment"
	echo "Setting a symlink for ./node_modules -> /opt/node_modules"
	ln -nsf /opt/node_modules /app

	echo "Cleaning dist assets..."
	rm -rf /app/public/dist
	npm run webpack-server
fi

# Generate a dist assets if they don't exist -- (If they were deleted on the volume mount)
[ ! -d "/app/public/dist" ] && npm run webpack-server


if [[ "$NODE_ENV" == "production" ]]; then
	pm2-runtime start /app/ecosystem._PROD_.config.js
elif [[ "$WEBPACK_HMR" == "true"  ]]; then
	pm2-runtime start /app/ecosystem._DEV_HOT_.config.js
else
	pm2-runtime start /app/ecosystem._DEV_.config.js
fi