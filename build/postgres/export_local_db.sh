#!/bin/bash

BACKUP_FILE_PATH=/docker-entrypoint-initdb.d/backup/dev_${POSTGRES_DB}.dump

echo "Exporting $POSTGRES_DB to $BACKUP_FILE_PATH"

PGPASSWORD="dev" pg_dump -v -h db -p 5432 -Fc -o -U dev $POSTGRES_DB > $BACKUP_FILE_PATH