#!/bin/bash

/usr/bin/php72 /usr/bin/composer install
npm install > /dev/null 2>&1
npm run build > /dev/null 2>&1