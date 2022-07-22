#!/bin/bash



DIR="/home/ubuntu/promos"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} dir"
  mkdir ${DIR}
fi

sudo apt update
sudo apt install ruby-full
sudo apt install wget
cd /home/ubuntu
wget https://bucket-name.s3.region-identifier.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto > /tmp/logfile