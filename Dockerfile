FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY app.js ./
COPY public ./public

EXPOSE 8080

CMD ["node", "app.js"]
