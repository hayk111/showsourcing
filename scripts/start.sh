#!/usr/bin/env bash

# wheter we target the app side (buyer) or the supplier side
PROJECT=""

echo -e "\n\e[1mPick a project\e[0m"
echo "1) Quick ng serve app"
echo "2) app"
echo "3) supplier"
read n
case $n in
	1) npm run serve && exit 0;;
	2) PROJECT="app";;
	3) PROJECT="supplier";;
	*) echo "you chose... POORLY" && exit 0;;
esac

echo -e "\nHello, What do you want to do?"
echo "1) serve"
echo "2) build"
echo "3) deploy"
echo "4) build & deploy"
read n
case $n in
	1)
	echo "Serving..."
	if [ "$PROJECT" = "app" ]; then
		npm run serve
	elif [ "$PROJECT" = "supplier" ]; then
	 	npm run serve:supp
	else
		echo "Project is not correct"
	fi;;
	2) ./scripts/build.sh $PROJECT;;
	3) ./scripts/deploy.sh false $PROJECT;;
	4) ./scripts/deploy.sh true $PROJECT;;
	*) echo "f*#@ you, that's not a valid choice";;
esac
