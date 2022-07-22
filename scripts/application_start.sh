#!/bin/bash

sudo chmod -R 777 /home/ec2-user/promos

cd /home/ec2-user/promos

#some changes here 
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  

cd /home/ec2-user/promos
npm install --g lerna
npm install
lerna exec npm i


cd /home/ec2-user/promos/packages/front
npm install
cd /home/ec2-user/promos/packages/back
npm install
cd /home/ec2-user/promos

npm run prod