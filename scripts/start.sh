#!/usr/bin/env bash

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
		2) npm run build;;
		3) ./deploy.sh $1;;
		4) npm run build
		   ./deploy.sh $1;;
		*) echo "fuck you, that's not a valid choice";;
esac