#!/bin/bash

LOG=/tmp/ssh-prod.log
DIR=/home/laravel/jasform
USER=laravel
HOST="172.31.45.106"
KEY=/home/laravel/.ssh/id_rsa
BASH=/usr/bin/bash

echo "--------------------" >> $LOG
echo "SSH starting at - `date`"  >> $LOG
echo "--------------------"  >> $LOG

echo "Running the SSH command"  >> $LOG
ssh -i $KEY $USER@$HOST "$BASH $DIR/production/deploy.sh" >> $LOG

echo "--------------------" >> $LOG
echo "SSH finishing at - `date`"  >> $LOG
echo "--------------------"  >> $LOG
echo ""  >> $LOG