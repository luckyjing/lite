#!/bin/sh

projectName=$1;

target=src/scripts/${projectName}.js

touch src/css/${projectName}.scss
touch $target
touch src/html/${projectName}.html

echo "import html from '../html/${projectName}.html';" > $target
echo "import '../css/${projectName}.scss';" >> $target
echo "\$('#root').append(html);\n" >> $target