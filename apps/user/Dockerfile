FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install pnpm
RUN pnpm install

COPY apps/user apps/user
COPY libs libs

RUN pnpm build user

CMD [ "nest", "start:dev", "user" ]