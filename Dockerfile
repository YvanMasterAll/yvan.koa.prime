FROM node:11.10

RUN mkdir /zzzk

WORKDIR /zzzk

COPY package.json /zzzk/package.json

RUN npm install

COPY . /zzzk
