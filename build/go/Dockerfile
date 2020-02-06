FROM golang:1.13.6

LABEL maintainer="Anthony Mineo <anthonymineo@gmail.com>"

WORKDIR /app

# Go Packages
RUN go get -u -v \
    # GUID Generator
    github.com/rs/xid \
    # PostgreSQL Driver
    github.com/jackc/pgx \
    github.com/jmoiron/sqlx \
    # Better Error Handling
    github.com/pkg/errors

COPY ./app/t2-stats /app

ENTRYPOINT go run main.go