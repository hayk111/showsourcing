#!/bin/bash

#font-style: normal \e[0m
#font-style: bold \e[1m

#color: default \e[39m
#color: red \e[31m
#color: green \e[32m
#color: magenta \e[35m

# check if we want to build
SHOULD_BUILD=$1
ENDPOINT=$2

ASK_PSWD=false
DIR="./dist/showsourcing"

CHOICES[1]="app-dev.showsourcing.com"
CHOICES[2]="app-sta.showsourcing.com"
CHOICES[3]="app.showsourcing.com"
CHOICES[4]="beta.showsourcing.com"
CHOICES[5]="supplier-dev.showsourcing.com"
CHOICES[6]="supplier-sta.showsourcing.com"
CHOICES[7]="supplier.showsourcing.com"


if [ -z "$ENDPOINT" ]; then
	echo "Please pick an endpoint to deploy to"
	for I in 1 2 3 4 5 6 7
	do
		echo "$I) ${CHOICES[$I]}"
	done
	read n
	ENDPOINT=${CHOICES[n]}
	case $n in
		1) BUILD="npm run build:dev" REGION="us-east-2";;
		2) BUILD="npm run build:sta" REGION="eu-west-1";;
		3) BUILD="npm run build" REGION="eu-central-1" ASK_PSWD=true;;
		4) BUILD="npm run build" REGION="us-east-1" ASK_PSWD=true;;
		5) BUILD="npm run build:supp:dev" REGION="eu-central-1" DIR="./dist/supplier";;
		6) BUILD="npm run build:supp:sta" REGION="eu-central-1" DIR="./dist/supplier";;
		7) BUILD="npm run build:supp" REGION="us-east-2" DIR="./dist/supplier" ASK_PSWD=true;;
	esac
	[ -z "$ENDPOINT" ] && echo "Invalid endpoint" && exit 0
fi

if $ASK_PSWD; then
	read -p "Please type 'yes deploy to prod' if you are sure to deploy to production: \e[39m $ENDPOINT \e[0m" accept
	if [ "$accept" != "yes deploy to prod" ]; then
		echo -e "\e[1m\e[31mSorry you just missed your chance to ruin prod, good luck with your life (: !"
		exit 0
	fi
fi

echo -e "\e[1m\e[35mDeploying to: \e[39m $ENDPOINT \e[0m"

if $SHOULD_BUILD; then
	echo "building with \`$BUILD\`"
	$BUILD
	echo "build done, about to deploy..."
fi

# check if aws client installed
if [ -x "$(aws --version)" ]; then
  echo '\e[1m \e[31mError: aws is not installed. Check this link to install: \e[39m \e[0m'
  echo 'https://www.google.com/search?q=install+aws+cli'
  exit 1
fi

if [ -d "$DIR" ]; then
  # Control will enter here if $DIRECTORY exists.
    cd "$DIR"
    aws s3 sync . s3://"$ENDPOINT" --delete --region "$REGION"
    aws s3 cp s3://"$ENDPOINT"/index.html s3://"$ENDPOINT"/index.html --metadata-directive REPLACE --cache-control max-age=0 --region "$REGION"
    else # else we need to build before
    echo "Build directory $DIR doesn't exist, I am gonna build for you using $BUILD"
    $BUILD
    echo "build done, about to deploy..."
    cd "$DIR"
    aws s3 sync . s3://"$ENDPOINT" --delete --region "$REGION"
    aws s3 cp s3://"$ENDPOINT"/index.html s3://"$ENDPOINT"/index.html --metadata-directive REPLACE --cache-control max-age=0 --region "$REGION"
fi
