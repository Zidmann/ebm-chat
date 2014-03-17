#!/bin/bash

########################################################################################################
# Script to prepare Mongo database for REST EBM Chat Server                                            #
# Auteur      : Zidmann (zidmann@gmail.com)                                                            #
# Date        : 14/03/2014                                                                             #
# Version     : 0.0.1                                                                                  #
# Note        : The sscript can not be started with root right by security                             #
########################################################################################################

ROOT_UID=0					# Root Id
 DB_NAME="ebmChat"				# Database name

#Check if user is not root
if [ $UID == $ROOT_UID ]; then
	echo -e "[-]Error : User can not be root to start Chat Server."
	exit 0
fi

mongo $DB_NAME ../mongo/mongo-insert-data.js
mongo $DB_NAME ../mongo/mongo-set-admin.js

