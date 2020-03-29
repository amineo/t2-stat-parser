#!/bin/bash
echo "Checking to see if @adonisjs/cli has been installed..."

package='@adonisjs/cli'
if [ `npm list -g | grep -c $package` -eq 0 ]; then
    while true; do
    echo "-----------------------------------------------"	
    echo "   Adonis CLI not installed"
    echo "-----------------------------------------------"
        read -p "Would you like to install this now? [Y/N]  " yn
        case $yn in
            [Yy]* ) npm i --global @adonisjs/cli; break;;
            [Nn]* ) break;;
            * ) echo "Please answer yes or no.";;
        esac
    done
else
    echo "Looks good!"
fi


echo "Generating key..."
APPKEY=$(npx adonis key:generate --echo)

echo -n "${APPKEY/APP_KEY=}" > ./docker-secrets/adonis.appkey.v1

echo "Done! Don't share it with anyone!"
echo "The key is located here: ./docker-secrets/adonis.appkey.v1"