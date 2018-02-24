FROM node:9 as build

WORKDIR /app
COPY package.json index.js ./
RUN npm install

FROM node:9-alpine
COPY --from=build /app /
EXPOSE 3000

CMD [ "npm", "start" ]
