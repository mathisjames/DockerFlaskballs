#!/bin/bash

# stop #
docker stop flaskballs

# delete #
docker rm flaskballs

# build docker container #
docker build -t jmathis/flaskballs:0.1 .

# run docker container #
docker run -d -p 8080:8080 --name flaskballs jmathis/flaskballs:0.1
