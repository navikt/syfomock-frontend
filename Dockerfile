FROM node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN yarn build

ENTRYPOINT ["yarn", "start-prod"]
