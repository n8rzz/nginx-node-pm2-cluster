FROM node:9 as build

WORKDIR /app
COPY /app/package.json /app/index.js ./
RUN npm install

FROM node:9-alpine
COPY --from=build /app /
EXPOSE 3000

CMD [ "npm", "start" ]
