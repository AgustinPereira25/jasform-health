#!/bin/bash

LOG=/tmp/ssh-prod.log
DIR=/home/laravel/jasform
USER=laravel
HOST="172.31.45.106"

echo "--------------------" >> $LOG
echo "SSH starting at - `date`"  >> $LOG
echo "--------------------"  >> $LOG

echo "Running the SSH command"  >> $LOG
ssh -i /home/laravel/.ssh/id_rsa $USER@$HOST "/usr/bin/bash /home/laravel/jasform/production/deploy.sh" >> $LOG

echo "--------------------" 
echo "SSH finishing at - `date`"
echo "--------------------"
echo ""