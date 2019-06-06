FROM node:latest
# replace this with your application's default port
EXPOSE 3000 35729

# Install app dependencies npm
COPY package.json /src/package.json
RUN cd /src; npm install

COPY . /src
WORKDIR /src

CMD ["node", "sender1.js"]
