FROM node:14

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json .

RUN yarn add react-scripts@4.0.3
RUN yarn install
COPY . ./

# start app
CMD ["yarn", "start"]