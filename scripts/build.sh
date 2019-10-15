#!/bin/bash

PROJECT=$1
# 1 - development, 2 - staging, 3 - production
ENVIRONMENT=$2
# By default the no-op command in shell is : (colon)
SEM_VER=":"
BUILDS[1]="npm run build:dev"
BUILDS[2]="npm run build:sta"
BUILDS[3]="npm run build"
BUILDS[4]="npm run build:supp:dev"
BUILDS[5]="npm run build:supp:sta"
BUILDS[6]="npm run build:supp"
BUILD_SENTENCE="\e[34m\e[1mBuilding with: \e[0m\e[39m"

# if we have the argument environment we don't need to read it
if [ -z "$ENVIRONMENT" ]; then
	echo -e "\n\e[1mPlease pick an environment to build on \e[4m${PROJECT}:\e[22m\e[0m"
	echo "1) development"
	echo "2) staging"
	echo "3) production"

	read n_env
else
	n_env=${ENVIRONMENT}
fi

echo -e "\n\e[1mPick a semantic version option\e[0m"
echo "1) don't increment the versioning"
echo "2) increment build number"
echo "3) increment patch number"
echo "4) increment minor number"

read n_ver
case $n_ver in
	1) SEM_VER=":";;
	2) SEM_VER="npm run version:build";;
	3) SEM_VER="npm run version:patch";;
	4) SEM_VER="npm run version:minor";;
	*) echo "By default versioning won't be incremented";;
esac

if [ "$PROJECT" = "app" ]; then
	case $n_env in
		1) $SEM_VER && echo -e "${BUILD_SENTENCE} ${BUILDS[1]}" && ${BUILDS[1]};;
		2) $SEM_VER && echo -e "${BUILD_SENTENCE} ${BUILDS[2]}" && ${BUILDS[2]};;
		3) $SEM_VER && echo -e "${BUILD_SENTENCE} ${BUILDS[3]}" && ${BUILDS[3]};;
		*) echo "Apparently you can't see the forest for the trees, cy@" && exit 0;;
	esac
elif [ "$PROJECT" = "supplier" ]; then
	case $n_env in
		1) $SEM_VER && echo -e "${BUILD_SENTENCE} ${BUILDS[4]}" && ${BUILDS[4]};;
		2) $SEM_VER && echo -e "${BUILD_SENTENCE} ${BUILDS[5]}" && ${BUILDS[5]};;
		3) $SEM_VER && echo -e "${BUILD_SENTENCE} ${BUILDS[6]}" && ${BUILDS[6]};;
		*) echo "Apparently you can't see the forest for the trees, cy@" && exit 0;;
	esac
else
	echo "Project named: ${PROJECT} does not exist" && exit 0
fi
