#!/bin/bash

echo "Setting up database..."
BACKUP_FILE_PATH=/docker-entrypoint-initdb.d/backup/t2_stats.sql

psql -d t2_stats -U dev -p 5432 -a -q -f $BACKUP_FILE_PATH
# -h PostgreSQL server IP address
# -d database name
# -U user name
# -p port which PostgreSQL server is listening on
# -f path to SQL script
# -a all echo
# -q quiet