# Supplier Show Sourcing Web App


## Overview of the documentation 

This readme will present the guidelines followed throughout the application and furnish a clear path to follow to understand the app. 
 
Therefor this readme will give the big picture of the app. However, each module has its own documentation in a readme. Thus when you need more detailed documentation you can start reading the documentation for each module.

## Table of Content

 - Prerequisite
 - Running the app
 - Other Scripts
 - Devtools addon
 - Where to start
 - File structure
 - Style structure
 - General architecture principles


## Prerequisite

If you are unfamiliar with angular 2+ stop right there, go read the [documentation](https://angular.io/docs). 
Beside a decent knowledge of the angular framework you should be familiar with [Rxjs](https://www.learnrxjs.io/)  and the [redux pattern](http://redux.js.org/)
as this app makes use of [ngrx](https://gist.github.com/btroncone/a6e4347326749f938510).


## Running the app

No surprise here 

```
git clone this_repo
cd project
npm i
npm start
```

The start script will start a webpack-dev-tool instance with a proxy to the api. The proxy config can be found in proxy.config.json.


## Other Scripts

For an up-to-date version of the scripts just open package.json and those figure in the `script` part.

You can run every script with `npm run`, for example `npm run start`.


 - `npm run build` will build a production ready of the app in the dist directory
 - `npm run lint` will start the linter
 - `npm run test` will run the unit tests

## Devtools addon

You can download the redux addon for chrome [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). Once the app is started right click anywhere on the document and then redux to start using it.


## File Structure & guidelines

The application is divided in modules. In the module directory there is 2 sub directories: shared and features. The shared modules are modules that are used by the entirety of the app. The feature modules are module that are self-contained and deal with only one page / popup / small feature of the app. 

Each module has a readme associated with it that quickly describe said module. The goal of that readme is to give an idea where the module is being used.

In each module the division of the file structure is with those folders (each one being optional).


```
 - components
 - directives
 - pipes
 - services
 - store
 - utils
 - interfaces
 my-module.module.ts
 README.md
```

the store is for files related to `ngrx`.

## Extensions

Each file extension describe what the file does. EG: `my-builder.service.ts` or `my-cat.interface.ts`. This is useful in IDEs when many files with similar names are open. 

## Style Structure



## General Architecture Principles
