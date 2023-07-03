FROM node:18.12-slim

WORKDIR /usr/app

COPY ./package.json ./

#Install dependencies
RUN npm install

#Copy rest of the code to container
COPY . .

EXPOSE 3090

# Run the API on Nodemon
CMD ["npm", "run", "serverstart"]