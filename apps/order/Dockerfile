FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install pnpm
RUN pnpm install

COPY apps/order apps/order
COPY libs libs

RUN pnpm build order

CMD [ "nest", "start:dev", "order" ]