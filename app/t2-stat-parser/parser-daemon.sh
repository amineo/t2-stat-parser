#!/bin/sh

echo "T2 Stat Parser Running...";

# Run this initially, then we'll execute this on a schedule
./start.sh

# Keep container running
tail -f /dev/null