FROM oven/bun:alpine

WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun install

COPY src src
COPY tsconfig.json .

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000
