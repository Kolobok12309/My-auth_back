FROM node:12-alpine

ENV APP_STAGE="docker"
ENV PORT 3000

RUN apk add yarn

WORKDIR /user/src

COPY package.json yarn.lock ./
RUN yarn

COPY . .

EXPOSE ${PORT}

RUN yarn build

CMD ["yarn", "start"]
