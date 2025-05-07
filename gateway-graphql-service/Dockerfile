FROM node:18

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port and start the server
EXPOSE 3000
CMD [ "node", "index.js" ]
