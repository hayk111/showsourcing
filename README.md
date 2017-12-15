# Supplier Show Sourcing Web App


## Overview of the documentation 

The goal of this readme is to present the guidelines followed throughout the application and furnish a clear path to follow to understand the app. 

## Table of Content

 - Prerequisite
 - Running the app
 - Other Scripts
 - Devtools addon
 - Where to start
 - File structure
 - Style structure
 - General architecture principles
 - Entities
 - Components
 - The Store


## Prerequisite

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

The start script will start a webpack-dev-server instance with a proxy to the api. The proxy config can be found in proxy.config.json.


## Other Scripts

For an up-to-date version of the scripts just open package.json and those figure in the `script` part.

You can run every script with `npm run`, for example `npm run start`.


 - `npm run build` will build a production ready of the app in the dist directory
 - `npm run lint` will start the linter
 - `npm run test` will run the unit tests

## Devtools addon

You can download the redux addon for chrome [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). Once the app is started right click anywhere on the document and then redux to start using it.


## File Structure & guidelines

The application is divided in modules. In the module directory there is 3 sub directories: features, shared and store. The shared modules are modules that are used by the entirety of the app. The feature modules are module that are self-contained and deal with only one page / popup / small feature of the app. 

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

The theming is done in ./src/app/theming and should be straight forward. `Style.scss` is the entry point and imports everything it needs. 

Spacing and palette use CSS4 variables and should be used throughout the application. CSS4 variables are used with a fallback (meaning that even if the browser doesn't support CSS4 vars it's gonna work).

Some scss files are based on google material design guidelinds. For instance `elevation.scss` is a somewhat simplified version of the file in angular material design.

## General Architecture Principles

### Entities
Found in `modules/store/utils/entities.utils.ts`.

The `EntityState` class is used to transform array that come from the back-end. Say we ask for suppliers and receive a list of 1000 suppliers. We don't want to search in the array everytime we want to find a supplier with a specific id. Therefor the array is transformed into:

```
export interface EntityState<G extends Entity> {
	pending: boolean;
	maxEntityCounter: number;
	byId: { [key: string]: G };
	ids: Array<string>;
}
```

The `EntityRepresentation` class is used to represent an entity (like a product), but is also used as an helper when something has a different displaying name than an urlName (for example a specific filter might be displayed as price but when put in an url it might be priceAmount).

Its class is relatively straight forward

```
export class EntityRepresentation  {
	constructor(public actionType: any,
							public entityName: string,
							public isEntity: boolean = false,
							public urlName?: string,
							public displayName?: string,
							public descriptorName?: CustomFieldsName | string) {
		// for plurals
		this.urlName = urlName || entityName.slice(0, -1);
		this.displayName = displayName || entityName;
		this.descriptorName = descriptorName || entityName + 'CFDef';
	}
}
```

The `entityRepresentationMap` contains all EntityRepresentations. The only time an EntityRepresentation is created should be in that map.

The `EntityTarget` is an interface that describe which entity we target.

```
export interface EntityTarget {
	entityId: string;
	entityRepr: EntityRepresentation;
}
```

### Components

One design choice we took with components is to make those self contained and reliant on an EntityTarget.
That means that for example a `FileInputComponent` will have as `@Input` only an `EntityTarget`. This component will do its thing and when the user picks a file, everything will be done in the background: the back end will be updated as well as the front end store. No need to do anything except putting the component in the template and giving it an `EntityTarget`. This has drawbacks but it's the design choice we took.

There isn't much services at all as most of the logic is handled in the store. There are things that don't fit in the store that go into services, but those are generally pretty obvious. Like the `DynamicFormBuilder`.

### The store
The main business logic of the app is handled in the store. 
The store is subdivided in : ui, entities. UI is for things that are displayed on screen ( dialog open etc), entities is for the different entities that are loaded via http usually.

The golden rule in the store is to normalize the data. For example if you have a product which contains comments,
votes, images, and files you'll have 5 entities in the store, namely products, comments, votes, images, and files.
It might seem annoying to do so at first but you should bite the bullet as it makes things easier afterward.

Effects are used in parallel with entities services. Effects deal with grabbing messages to the store and calling the appropriate service function which is usually just an http call.
