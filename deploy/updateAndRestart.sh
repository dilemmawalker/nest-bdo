#!/bin/bash

# any future command that fails will exit the script.
set -e

# Delete the old repo
#rm -rf /home/ubuntu/nest-bdo/
cd /home/ubuntu/nest-bdo

# clone the repo again
git pull origin development 

echo "PM2 status"
pm2 status

#install npm packages
echo "Running npm install"
npm i

#build node server
echo "Running build"
npm run build admin

#build node server
echo "Running build"
npm run build agent

#Restart the node server
pm2 start "npm start admin"

#Restart the node server
pm2 start "npm start agent"
