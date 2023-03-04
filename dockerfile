# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:13 as build

RUN mkdir --p /app/bpni/backend

# Set the working directory
WORKDIR /app/bpni/backend

# Add the source code to app
COPY ./blueprintnotincluded-backend /app/bpni/backend
COPY ./blueprintnotincluded-lib /app/bpni/blueprintnotincluded-lib

# Build libs
WORKDIR /app/bpni/blueprintnotincluded-lib
RUN npm install --legacy-deps

# Set the new working dir
WORKDIR /app/bpni/backend

# Install all the dependencies
RUN npm install --legacy-deps

# Expose port 3000
EXPOSE 3000

#RUN npm run dev
ENTRYPOINT npm run dev