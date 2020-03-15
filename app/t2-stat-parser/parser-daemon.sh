#!/bin/sh

echo "T2 Stat Parser Running...";

# Run this initially, then we'll execute this on a schedule
./start.sh

# Keep container running with the cron schedule
crond -l 2 -f