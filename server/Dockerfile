# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build   # or RUN tsc

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 5000
ENV NODE_ENV=production

CMD ["node", "dist/src/server.js"]