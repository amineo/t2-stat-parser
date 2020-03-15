# [ Stage 1]  Builder
FROM golang:1.14-alpine AS builder

# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64


WORKDIR /app
COPY ./app/t2-stat-parser /app

# Copy and download dependency using go mod
RUN go mod download
RUN go build -o main .


# ------------------------------------------
# ------------------------------------------

# [ Stage 2]

FROM golang:1.14-alpine
LABEL maintainer="Anthony Mineo <anthonymineo@gmail.com>"

RUN apk update && apk add --no-cache wget tzdata

#Set TimeZone
ENV TZ=America/New_York

#Set cron schedule  (every day at 9:30am est)
RUN echo '30 9 * * * /app/start.sh' > /etc/crontabs/root

WORKDIR /app

COPY --from=builder /app/main /app/main
COPY ./app/t2-stat-parser/start.sh /app/start.sh
COPY ./app/t2-stat-parser/parser-daemon.sh /app/parser-daemon.sh

ENTRYPOINT ./parser-daemon.sh