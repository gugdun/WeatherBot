FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --prod

# Bundle app source
COPY . .

# Run app
CMD [ "npm", "run", "start" ]
