FROM postgres:11.5

COPY ./build/postgres/docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
COPY ./build/postgres/export_local_db.sh /export_local_db.sh