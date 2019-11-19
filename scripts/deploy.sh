#!/bin/bash

#font-style: normal \e[0m
#font-style: bold \e[1m

#underline: \e[4m
#not underlines \e[22m

#color: default \e[39m
#color: red \e[31m
#color: green \e[32m
#color: blue \e[34m
#color: magenta \e[35m

# check if we want to build
SHOULD_BUILD=$1
PROJECT=$2
ENDPOINT=$3

APP_ENDPOINTS[1]="app-dev.showsourcing.com"
APP_ENDPOINTS[2]="app-sta.showsourcing.com"
APP_ENDPOINTS[3]="app.showsourcing.com"

SUPP_ENDPOINTS[1]="supplier-dev.showsourcing.com"
SUPP_ENDPOINTS[2]="supplier-sta.showsourcing.com"
SUPP_ENDPOINTS[3]="supplier.showsourcing.com"

# 1 - development, 2 - staging, 3 - production
ENVIRONMENT="sasquatch"
ASK_PSWD=false
DIR="./dist/showsourcing"

# About booleans in shell
# https://stackoverflow.com/questions/2953646/how-to-declare-and-use-boolean-variables-in-shell-script/21210966#21210966

if [ -z "$ENDPOINT" ]; then
	echo -e "\n\e[1mPlease pick an endpoint to deploy to:\e[0m "

	# FOR PROJECT APP
	if [ "$PROJECT" = "app" ]; then
		# DISPLAY OPTIONS
		for I in 1 2 3; do
			echo "$I) ${APP_ENDPOINTS[I]}"
		done
		read n_epoint

		ENDPOINT=${APP_ENDPOINTS[n_epoint]}
		case $n_epoint in
		1) REGION="us-east-2" ENVIRONMENT="1" ;; # app-dev
		2) REGION="eu-west-1" ENVIRONMENT="2" ;; # app-sta
		3) REGION="eu-central-1" ENVIRONMENT="3" ASK_PSWD=true ;; # app (prod)
		*) echo "You had 1 job, pick the correct endpoint, NEXT!" && exit 0 ;;
		esac

	# FOR PROJECT SUPPLIER
	elif [ "$PROJECT" = "supplier" ]; then
		# DISPLAY OPTIONS
		for I in 1 2 3; do
			echo "$I) ${SUPP_ENDPOINTS[I]}"
		done
		read n_epoint

		DIR="./dist/supplier"
		ENDPOINT=${SUPP_ENDPOINTS[n_epoint]}
		case $n_epoint in
		1) REGION="eu-central-1" ENVIRONMENT="1" ;; # supplier-dev
		2) REGION="eu-central-1" ENVIRONMENT="2" ;; # supplier-sta
		3) REGION="us-east-2" ENVIRONMENT="3" ASK_PSWD=true ;; # supplier (prod)
		*) echo "You had 1 job, pick the correct endpoint, NEXT!" && exit 0 ;;
		esac
	else
		echo "Project named: ${PROJECT} does not exist" && exit 0
	fi

	[ -z "$ENDPOINT" ] && echo "Invalid endpoint" && exit 0
fi

if $ASK_PSWD; then
	read -p "Please type \e[1m'yes deploy to prod'\e[0m if you are sure to deploy to production: \e[39m $ENDPOINT \e[0m" accept
	if [ "$accept" != "yes deploy to prod" ]; then
		echo -e "\e[1m\e[31mSorry you just missed your chance to ruin prod, good luck with your life (: !"
		exit 0
	fi
fi

if $SHOULD_BUILD; then
	./scripts/build.sh $PROJECT $ENVIRONMENT
fi

# check if aws client installed
if [ -x "$(aws --version)" ]; then
	echo '\e[1m \e[31mError: aws is not installed. Check this link to install: \e[39m \e[0m'
	echo 'https://www.google.com/search?q=install+aws+cli'
	exit 1
fi

echo -e "\nChecking if the build has been created on: '${DIR}'"
if [ -d "$DIR" ]; then
	echo -e "Indeed, \e[1m\e[35mDeploying to: \e[39m $ENDPOINT \e[0m"
	# Control will enter here if $DIRECTORY exists.
	cd "$DIR"
	aws s3 sync . s3://"$ENDPOINT" --delete --region "$REGION"
	aws s3 cp s3://"$ENDPOINT"/index.html s3://"$ENDPOINT"/index.html --metadata-directive REPLACE --cache-control max-age=0 --region "$REGION"
else
	echo -e "\e[1m\e[31mBuild has failed or no build has been made, no deployment was given\e[0m\e[39m"
fi
