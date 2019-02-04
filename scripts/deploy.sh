#!/bin/bash

# check if we want to build
SHOULD_BUILD=$1
ENDPOINT=$2


if [ -z "$ENDPOINT" ]
  then
    echo "Please pick an endpoint to deploy to"
    echo "1) app2.showsourcing.com"
    echo "2) app-dev.showsourcing.com"
    echo "3) app-sta.showsourcing.com"
    read n
    case $n in
        1) ENDPOINT="app2.showsourcing.com";;
        2) ENDPOINT="app-dev.showsourcing.com";;
        3) ENDPOINT="app-sta.showsourcing.com";;
        *) invalid option;;
    esac
fi

echo "$ENDPOINT"

if $SHOULD_BUILD; then
    npm run build
fi

DIR="./dist/showsourcing"

if [ -d "$DIR" ]; then
  # Control will enter here if $DIRECTORY exists.
    cd "$DIR"
    aws s3 sync . s3://"$ENDPOINT" --delete
    aws s3 cp s3://"$ENDPOINT"/index.html s3://"$ENDPOINT"/index.html --metadata-directive REPLACE --cache-control max-age=0
    else # else we need to build before
    echo "directory "$DIR" doesn't exist, you have to build first"
fi
