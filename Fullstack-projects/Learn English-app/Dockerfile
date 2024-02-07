# Use the Alpine Linux- based Node.js version 20 image as the base image

FROM node:20-alpine

EXPOSE 8080

# Copy all the files from the current directory to the /app directory inside the container
COPY . /app

# Run the npm install command to install Node.js dependencies for the application
RUN npm install

# Set the default command for the container to start the Node.js application using index.js
CMD ["node", "index.js"]