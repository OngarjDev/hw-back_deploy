FROM oven/bun:1

WORKDIR /app


COPY package.json ./
COPY bun.lockb ./


COPY prisma ./prisma/


COPY . .

RUN bun install

RUN bunx prisma generate

FROM mcr.microsoft.com/appsvc/node:10-lts

ENV HOST 0.0.0.0
ENV PORT 8080
EXPOSE 8080

ENTRYPOINT ["pm2", "start", "--no-daemon", "/opt/startup/index.js"]
CMD ["bun", "start"]
