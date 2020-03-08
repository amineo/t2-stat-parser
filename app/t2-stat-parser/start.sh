#!/bin/sh

echo "Checking if build exists.."
if [ -f /app/main ]
then
    echo "Build found!"
    /app/main
else
    echo "No build found, running from source"
    go run *.go
fi
