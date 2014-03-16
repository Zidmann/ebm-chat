#!/bin/bash

# crontab line :
# 0 0 * * * cd /home/emmanuel/Bureau/EBusiness/Android/Chat/ebm-chat/mongo; ./dump.sh >> dump.log 2>&1

DATE=`date +%y%m%d-%H%M%S`
  DB="ebmChat"
echo Starting backup on $DATE

# Dumping the database into ./backup/cia/
mongodump -d $DB -o backup > /dev/null

# Compress the files
tar -czPf backup/dump$DB-$DATE.tar.gz backup/$DB/
echo Backup successful !
echo
