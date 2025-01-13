# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the application code into the container
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose the necessary port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
