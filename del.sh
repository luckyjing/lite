#!/bin/sh

projectName=$1;

target=src/scripts/${projectName}.js

rm src/css/${projectName}.scss
rm $target
rm src/html/${projectName}.html