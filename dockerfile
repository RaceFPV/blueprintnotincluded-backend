# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:15 as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app/blueprint

# Set the new working dir
WORKDIR /app/blueprint

# Install all the dependencies
RUN npm install --legacy-deps

# Run the app
RUN npm run dev

# Expose port 80
EXPOSE 3000