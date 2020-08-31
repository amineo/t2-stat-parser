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

# file_env 'APP_KEY'


# # Exit if APP_KEY is missing, this key is important!
# if [ -z "$APP_KEY" ]
# then
# 	echo >&2 "[ERROR] No ENV for APP_KEY or APP_KEY_FILE found!"
# 	echo >&2 "Run the ./generate-adonis-app-key.sh script or provide one at runtime"
# 	exit 1
# fi



if [[ "$NODE_ENV" == "production" ]]; then
	pm2-runtime start /opt/node_app/ecosystem._PROD_.config.js
else
	npm install && \
	pm2-runtime start /opt/node_app/ecosystem._DEV_.config.js
fi