#!/bin/bash

LOG=/tmp/deploy.log
DIR=/home/laravel/jasform

echo "--------------------" >> $LOG
echo "Deploy starting at - `date`"  >> $LOG
echo "--------------------"  >> $LOG

echo "Accessing the DIR"  >> $LOG
cd $DIR

echo "Running git pull command"  >> $LOG
git pull  >> $LOG

echo "Running docker compose command"  >> $LOG
docker compose up -d --build  >> $LOG

echo "--------------------" 
echo "Deploy finishing at - `date`"
echo "--------------------"
echo ""