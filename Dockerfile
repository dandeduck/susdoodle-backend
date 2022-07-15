FROM node:14-alpine

WORKDIR /workspace

COPY package.json /workspace/

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]