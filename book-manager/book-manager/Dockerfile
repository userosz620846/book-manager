# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /home/user/book-manager/src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

EXPOSE 3000
# Build the React app
RUN npm run build

# Serve the app
CMD ["npx", "serve", "-s", "build"]
