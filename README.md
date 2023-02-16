# Blueprintnotincluded-backend

This is the backend api and database connection for blueprintnotincluded

## Docker image build

Build the image

`>docker build . -t bpni-backend:latest`

Build the backend api image

`docker build -f backend.Dockerfile -t bpni-backend:latest .`

Run the image and backend

`docker run -d -p 8081:3000 bpni-backend:latest`

Visit http://localhost:8081

###