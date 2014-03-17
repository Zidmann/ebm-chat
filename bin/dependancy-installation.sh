#!/bin/bash

########################################################################################################
# Script to install packages used by REST EBM Chat Server                                              #
# Auteur      : Zidmann (zidmann@gmail.com)                                                            #
# Date        : 14/03/2014                                                                             #
# Version     : 0.0.1                                                                                  #
# Note        : The server can not be started without root right by security                           #
#               nodemon is used instead of nodejs to automatickly update server when files are changed #
#               The script was tested on Ubuntu 13.10                                                  #
########################################################################################################

ROOT_UID=0					# Root Id

#Check if user is not root
if [ $UID != $ROOT_UID ]; then
	echo -e "[-]Error : User must be root to install dependancy of Chat Server."
	exit 0
fi

#Need to update 
apt-get update;
apt-get upgrade;

#Install Mongodb and Nodejs
apt-get install python-software-properties python g++ make;
apt-get install nodejs;
apt-get install mongodb;

#Start Mongodb database
/etc/init.d/mongodb start;

#Install nodemon module
#Note : Nodemon needs to use 'node' command but on Ubuntu 13.10, this command is replaced by 'nodejs'
ln -s /usr/bin/nodejs /usr/local/bin/node;
npm install -g nodemon;

