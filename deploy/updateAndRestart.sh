#!/bin/bash

# any future command that fails will exit the script
set -e

# Delete the old repo
rm -rf /home/ubuntu/angular/

# clone the repo again
git clone --single-branch --branch admin https://gitlab.com/varsharautjee/angular.git

#source the nvm file. In an non
#If you are not using nvm, add the actual path like
# PATH=/home/ubuntu/node/bin:$PATH
#source /home/ubuntu/.nvm/nvm.sh

# stop the previous pm2
#pm2 kill
#npm remove pm2 -g


#pm2 needs to be installed globally as we would be deleting the repo folder.
# this needs to be done only once as a setup script.
#npm install pm2 -g
# starting pm2 daemon
pm2 status

cd /home/ubuntu/angular

#install npm packages
echo "Running npm install"
npm i

#build node server
npm run build agent

#Restart the node server
pm2 start "npm start admin"