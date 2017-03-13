#!/bin/sh

projectName=$1;

target=src/scripts/${projectName}.js

touch src/css/animate/${projectName}.scss
touch $target
touch src/scripts/${projectName}.html

echo "import html from './${projectName}.html';" > $target
echo "import '../css/animate/${projectName}.scss';" >> $target
echo "\$('#root').append(html);\n" >> $target