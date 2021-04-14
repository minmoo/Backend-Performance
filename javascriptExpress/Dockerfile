FROM node:15.4.0

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install
CMD ["node", "index.js"]
EXPOSE 8000