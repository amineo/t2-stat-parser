# [ Stage 1]  Builder
FROM golang:alpine AS builder

# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64


WORKDIR /app
COPY ./app/t2-stats /app

# Copy and download dependency using go mod
RUN go mod download


# # Go Packages
# RUN go get -u -v \
#     # GUID Generator
#     github.com/rs/xid \
#     # PostgreSQL Driver
#     github.com/jackc/pgx \
#     github.com/jmoiron/sqlx \
#     # Better Error Handling
#     github.com/pkg/errors

RUN go build -o main .


# [ Stage 2]

FROM golang:alpine

LABEL maintainer="Anthony Mineo <anthonymineo@gmail.com>"

WORKDIR /app

COPY --from=builder /app/main /app/main
COPY ./app/t2-stats/start.sh /app/start.sh

ENTRYPOINT ./start.sh