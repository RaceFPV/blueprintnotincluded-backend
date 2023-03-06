# Blueprintnotincluded-backend

This is the backend api and database connection for blueprintnotincluded

## Docker image build

Build the image

`docker build . -t bpni-backend:latest`

Build the backend api image

`docker build -f backend.Dockerfile -t bpni-backend:latest .`

Run mongodb (mongoose version only allows mongo version 4.2)

`docker run -d -p 27017:27017 mongo:4.2`

Run the image and backend

`docker run -d -p 3000:3000 -e JWT_SECRET=mysecretkey -e ENV_NAME=development -e CAPTCHA_SITE=localhost -e CAPTCHA_SECRET=mysecretkey -e MONGO_DB_URI="127.0.0.1:27017" bpni-backend:latest`

Visit http://localhost:8081

###