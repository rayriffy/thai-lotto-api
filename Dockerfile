FROM oven/bun:1.2.5-debian AS builder

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY ./src ./src

ENV NODE_ENV=production
RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts

# ? -------------------------

FROM debian:12-slim AS runner

WORKDIR /app
COPY --from=builder /app/server server

ENV TZ=Asia/Bangkok
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["./server"]
