# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend code
COPY . .

# Expose backend port
EXPOSE 8000

# Start the server
CMD ["npm", "run", "server"]
