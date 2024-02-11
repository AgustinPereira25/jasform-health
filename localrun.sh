#!/bin/bash
./vendor/bin/sail up -d
. ~/.nvm/nvm.sh
nvm use
npm run dev

#after creating this file you have to change the permissions by running the following command only for the first time
#chmod +x localrun.sh
