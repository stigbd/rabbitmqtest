FROM node:latest
# replace this with your application's default port
EXPOSE 3000 35729

# Install app dependencies npm
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src
WORKDIR /src

CMD ["node", "receiver.js"]
