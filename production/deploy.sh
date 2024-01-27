#!/bin/bash

LOG=/tmp/deploy.log
DIR=/home/laravel/jasform

echo "--------------------" >> $LOG
echo "Deploy starting at - $(date)"  >> $LOG
echo "--------------------"  >> $LOG

echo "Accessing the DIR"  >> $LOG
cd $DIR

echo "Running git pull command"  >> $LOG
OUTPUT=$(git pull)
echo $OUTPUT >> $LOG
LINES=$(echo "$OUTPUT" | wc -l)

echo "Running docker compose command"  >> $LOG
if [ $LINES -gt 1 ]; then
    echo "Repo updated. Running docker compose" >> $LOG
    docker compose up -d --build  >> $LOG
else
    echo "Skip it. Lines - $(echo $LINES)" >> $LOG
fi

echo "--------------------" >> $LOG
echo "Deploy finishing at - `date`" >> $LOG
echo "--------------------" >> $LOG
echo "" >> $LOG