#!/bin/bash

sudo chown -R ubuntu /home/ubuntu/ellty

cd /home/ubuntu/promos

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


cd /home/ubuntu/promos
npm install --g lerna
npm install
lerna exec npm i


cd /home/ubuntu/promos/packages/front
npm install
cd /home/ubuntu/promos/packages/back
npm install
cd /home/ubuntu/promos

npm run build
npm run prod