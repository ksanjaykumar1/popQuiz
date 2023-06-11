FROM node:16.13-slim as base

WORKDIR /app

RUN apt-get update && apt-get install -y 

COPY ["package.json", "yarn.lock", "./"]

RUN yarn 

COPY ./ .

CMD ["npm", "start" ]