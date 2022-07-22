#!/bin/bash



DIR="/home/ec2-user/promos"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} dir"
  mkdir ${DIR}
fi

