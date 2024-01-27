#!/bin/bash

LOG=/tmp/deploy.log
DIR=/home/laravel/jasform

echo "--------------------" >> $LOG
echo "Deploy starting at - $(date)"  >> $LOG
echo "--------------------"  >> $LOG
echo "" >> $LOG
echo "Variables: LOG: $LOG - DIR: $DIR"
echo "" >> $LOG

echo "Accessing DIR"  >> $LOG
cd $DIR

echo "Checking changes in repo"  >> $LOG
if [ $(git diff-index --quiet HEAD --) ]; then
    echo "No changes. Skip it." >> $LOG
else
    echo "Changes detected. Running git pull command"  >> $LOG
    git pull >> $LOG
    echo "Repo updated. Running docker compose" >> $LOG
    docker compose up -d --build  >> $LOG
fi

echo "--------------------" >> $LOG
echo "Deploy finishing at - `date`" >> $LOG
echo "--------------------" >> $LOG
echo "" >> $LOG