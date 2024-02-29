#!/bin/bash

LOG=/tmp/deploy.log
DIR=/opt/medicalljasform

echo "--------------------" >> $LOG
echo "Deploy starting at - $(date)"  >> $LOG
echo "--------------------"  >> $LOG
echo "Variables: LOG: $LOG - DIR: $DIR" >> $LOG

echo "Accessing DIR"  >> $LOG
cd $DIR

echo "Checking changes in repo"  >> $LOG
GIT=$(git rev-list HEAD...origin/main --count)
if [ $GIT -gt 0 ]; then
    echo "Changes detected - $(echo $GIT). Running git pull command"  >> $LOG
    git pull >> $LOG
    echo "Repo updated. Running docker compose" >> $LOG
    docker compose up -d --build  >> $LOG
    docker ps >> $LOG
else
    echo "No changes. Skip it." >> $LOG
    docker ps >> $LOG
fi

echo "--------------------" >> $LOG
echo "Deploy finishing at - `date`" >> $LOG
echo "--------------------" >> $LOG
echo "" >> $LOG
