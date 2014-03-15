#!/bin/bash

############################################################################################
# Script to start Node server for REST EBM Chat Server                                     #
# Auteur      : Zidmann (zidmann@gmail.com)                                                #
# Date        : 14/03/2014                                                                 #
# Version     : 0.0.1                                                                      #
# Note        : The server can not be started with root right by security                  #
############################################################################################

ROOT_UID=0					# Root Id

#Check if user is not root
if [ $UID == $ROOT_UID ]; then
	echo -e "Error : User can not be root to start Chat Server.\n"
	exit 0
fi

nodemon ../server/index.js;

