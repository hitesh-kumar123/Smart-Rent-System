FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# IMPORTANT: bind to 0.0.0.0 so browser can access it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
