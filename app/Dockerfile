FROM node:9 as build

WORKDIR /app
ADD . /app
RUN npm install

FROM node:9-alpine
COPY --from=build /app /
EXPOSE 3000

CMD [ "npm", "start" ]
