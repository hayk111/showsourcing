#!/bin/bash

# check if we want to build
SHOULD_BUILD=$1
ENDPOINT=$2

CHOICES[1]="app-test.showsourcing.com"
CHOICES[2]="app-dev.showsourcing.com"
CHOICES[3]="app-sta.showsourcing.com"
CHOICES[4]="app2.showsourcing.com"
CHOICES[5]="app.showsourcing.com"

if [ -z "$ENDPOINT" ]
  then
    echo "Please pick an endpoint to deploy to"
    for I in 1 2 3 4 5
    do
      echo "$I) ${CHOICES[$I]}"
    done
    read n
    ENDPOINT=${CHOICES[n]}
    [ -z "$ENDPOINT" ] && echo "Invalid endpoint" && exit 0
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
