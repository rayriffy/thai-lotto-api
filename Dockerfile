FROM debian:12-slim as builder

WORKDIR /app

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install

# ? -------------------------

FROM gcr.io/distroless/base-debian12

WORKDIR /app

COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /app/node_modules node_modules

COPY src src

ENV ENV production
ENV PORT 3000
CMD ["./bun", "src/index.ts"]

EXPOSE 3000
