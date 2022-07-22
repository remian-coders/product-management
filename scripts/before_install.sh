#!/bin/bash



DIR="/home/ubuntu/promos"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} dir"
  mkdir ${DIR}
fi

