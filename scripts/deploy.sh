#!/bin/bash

# check if we want to build
SHOULD_BUILD=$1
ENDPOINT=$2


if [ -z "$ENDPOINT" ]
  then
    echo "Please pick an endpoint to deploy to"
    echo "1) app-test.showsourcing.com"
    echo "2) app-dev.showsourcing.com"
    echo "3) app-sta.showsourcing.com"
    echo "4) app2.showsourcing.com"
    echo "5) app.showsourcing.com"
    read n
    case $n in
			1) ENDPOINT="app-test.showsourcing.com";;
			2) ENDPOINT="app-dev.showsourcing.com";;
			3) ENDPOINT="app-sta.showsourcing.com";;
			4) ENDPOINT="app2.showsourcing.com";; # --region us-east-2
			5) ENDPOINT="app.showsourcing.com";; # --region eu-central-1
			*) invalid option;;
    esac
fi

echo "$ENDPOINT"

if $SHOULD_BUILD; then
	npm run build
	echo "build done, about to deploy..."
fi

# check if aws client installed
if [ -x "$(aws --version)" ]; then
  echo 'Error: aws is not installed. Check this link to install:'
  echo 'https://www.google.com/search?q=install+aws+cli'
  exit 1
fi

DIR="./dist/showsourcing"

if [ -d "$DIR" ]; then
  # Control will enter here if $DIRECTORY exists.
    cd "$DIR"
    aws s3 sync . s3://"$ENDPOINT" --delete
    aws s3 cp s3://"$ENDPOINT"/index.html s3://"$ENDPOINT"/index.html --metadata-directive REPLACE --cache-control max-age=0
    else # else we need to build before
    echo "Build directory "$DIR" doesn't exist, I am gonna build for you"
    npm run build
    echo "build done, about to deploy..."
    cd "$DIR"
    aws s3 sync . s3://"$ENDPOINT" --delete
    aws s3 cp s3://"$ENDPOINT"/index.html s3://"$ENDPOINT"/index.html --metadata-directive REPLACE --cache-control max-age=0
fi
