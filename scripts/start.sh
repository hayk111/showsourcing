#!/usr/bin/env bash

SHOULD_BUILD=false

echo "Hello, What do you want to do ?"
echo "1) serve"
echo "2) build"
echo "3) deploy"
echo "4) build & deploy"
read n
case $n in
	1)
	echo "Serving..."
	npm run serve;;
	2) SHOULD_BUILD=true;;
	3) ./scripts/deploy.sh false $1;;
	4) ./scripts/deploy.sh true $1;;
	*) echo "fuck you, that's not a valid choice";;
esac

# About booleans in shell
# https://stackoverflow.com/questions/2953646/how-to-declare-and-use-boolean-variables-in-shell-script/21210966#21210966
if $SHOULD_BUILD; then
	echo "Please pick an enviroment to build:"
	echo "1) production"
	echo "2) staging"

	read n
	case $n in
		1) npm run build;;
		2) npm run build:sta;;
		*) echo "Apparently you can't see the forest for the trees, cy@" && exit 0
	esac
fi