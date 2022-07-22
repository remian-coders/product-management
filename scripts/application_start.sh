#!/bin/bash

echo 'Starting application...'
cd /home/ec2-user/promos
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
cd /home/ec2-user/promos
sudo npm install --g lerna
sudo npm install
lerna exec npm install


cd /home/ec2-user/promos/packages/front
npm install
cd /home/ec2-user/promos/packages/back
npm install
cd /home/ec2-user/promos

npm run dev