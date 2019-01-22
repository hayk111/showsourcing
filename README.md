# Supplier Show Sourcing Web App


# Overview of the documentation

The goal of this readme is to present the guidelines followed throughout the application and furnish a clear path to follow to understand the app.

# Table of Content

 - Running the app
 - Other Scripts
 - File structure
 - Style structure
 - Before starting
 - Entity Services
 - List Page Service
 - Auto Unsub
 - Translation



# Running the app

No surprise here

```
git clone this_repo
cd project
npm i
npm start
```

## Other Scripts

For an up-to-date version of the scripts just open package.json and those figure in the `script` part.

You can run every script with `npm run`, for example `npm run start`.


 - `npm run build` Builds a production ready of the app in the dist directory
 - `npm run analyze` Runs the dependency reports, so we can analyze the sizes of the different modules
 - `npm run translate` Generates the source translation file `messages.xlf`
 - `npm run start:fr` Run the application with the french language configuration
 - `npm run build:fr` Builds a production ready of the app in the dist directory with the french language configuration
 - `npm run translate:fr` Translates and generates `message.xlf` `messages.fr.xlf`, also merges the old source langauge file with the new one (see Translation section)


# File Structure & guidelines

At the root of src/app we have

 ```
  - app-root: small folder containing only the root module and root component
  - common: folder containing big modules like ProductCommonModule, TaskCommonModule.
  - core: folder containing essential classes on which the application is based
  - features: folder containing feature modules (pages)
  - shared: folder containing modules shared. The SharedModule contains them all.
  - theming: contains the global styles
  - utils: contains some utils used throughout the app
 ```


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

# Style Structure

The theming is done in ./src/app/theming and should be straight forward. `styles.scss` is the entry point and imports everything it needs.

Spacing and palette use CSS4 variables and should be used throughout the application. CSS4 variables are used with a fallback (meaning that even if the browser doesn't support CSS4 vars it's gonna work).

Some scss files are based on google material design guidelinds. For instance `elevation.scss` is a somewhat simplified version of the file in angular material design.

# Before starting

To have a smooth time understanding the app, two big features have to be understood first.
The Entity Services and the ListPageService. Those will be described below

# Entity Services

When accessing the db for an entity we use its entity service. For example if we want to access the ProductVotes in the database we will use `ProductVoteService`. If you open the file you'll notice the file is quite empty, the class `ProductVoteService` merely extends GlobalService that does the heavy lifting.

So At the base of the data business logic we have a bunch of entity service that provide CRUD
functions like `queryOne`, `queryMany`, `selectOne`, `update` and so on...

The difference between `query` and `select` is that the `select` will do a subscription.
So you'll be notified of changes that happen on the back end (it could be changes from other people).

There is one special method that is `getListQuery` that return a `ListQuery`
that can be used for `refetching`, `loadMore`, etc...

## To Subscribe or not to unsubscribe ?

All the methods except the ones that retrieve data use `first()` as rxjs pipe.
That means that you don't have to worry about unsubscribing and things like this are
perfectly valid without ever unsubscribing:

```
    this.productSrv.update(product).subscribe();
```

## Updating Subentity

When a subentity is updated it has to be by making a new one. Example:

```
		this.productSrv.update({
			id: event.item.id,
			status: new ProductStatus({ id: statusId })
		}).subscribe();
```

We create a new Product status and give the id of an existing one.
This is because the cache expect to receive a __typename inside the object, this means that the following would also be valid

```
		this.productSrv.update({
			id: event.item.id,
			status: { id: statusId, __typename: 'Status' }
		}).subscribe();
```

We don't have to do it for the root entity because the global service automatically does
it himself.

## Under the hood

Understanding what's under the hood is not important to understand the rest of the application. However the following can be interesting if there is a need for debugging.
Entity services extend `GlobalService` that adds crud operations, and more. It will do heavy logging and do some other behind the scene work. To do the querying automatically it uses the `QueryBuilder`.

To understand more about it you'll have to check the implementation.


## QueryBuilder

The query builder create graphQL queries.

```
queryBuilder.queryOne(fields); // where fields are the fields we want to query
```

The queryBuilder can be invoked as such : `new QueryBuilder('productVote', 'productVotes')` where the first parameter is the singular version of the entity and the second is the plural version.
The content of the queryOne method in query builder is simple to understand, it will create a graphql query with the fields we specify as parameters.

```
	queryOne = (str: string) => gql(`
		query ${this.sing}($id: String!) {
			${this.sing}(id: $id) {
				id
				${str}
			}
		}`)
```

## GlobalQueries

The `GlobalQuery` class is really simple as it is supposed to be extended.

```
export abstract class GlobalQueries {
	static one = 'name';
	static many = 'name';
	static all = 'name';
	static update = '';
	static create = '';
}
```

When you do this

```
export class Supplier extends GlobalQueries {
	static one = 'name, description';
}
```

It will basically make the application request for a `name` and a `description` every time a query to *one* `Supplier` is made.


# List Page Service

List and tables are used extensively in the application. We have a service that deals with
most of the logic for those lists. This service is called `ListPageService`. To understand this app it's paramount that one understand that first.


# AutoUnsub

To prevent memory leaks, components which are using observables should extend the class `AutoUnsub` and use the `takeUntil` method on observable. This will automatically unsubscribe from observables when the component is destroyed.
The AutoUnsub class should be used as a standard app wise.


# Translation

(13/06/18) by Michael

[Documentation on xliffmerge](https://github.com/martinroob/ngx-i18nsupport)
`npm run translate` will generate `messages.xlf`

Since the current version of Angular/cli@~6.0.0 doesn't support the previous format to start the server with a given language
e.g. `ng serve --aot --i18n-file src/locale/messages.fr.xlf --i18n-locale fr --i18n-format xlf --i18n-missing-translations warning` it has to be declared on `angular.json`. Following the previous example with `fr` we have to declare:

```JSON
"projects": {
    "showsourcing": {
        ···
        "build": {
            "configurations": {
                ···
                "fr": {
                    "aot": true,
                    "outputPath": "dist/fr",
                    "i18nFile": "src/locale/messages.fr.xlf",
                    "i18nFormat": "xlf",
                    "i18nLocale": "fr"
                }
            }
        },
        "serve": {
            ···
            "configurations": {
               ···
                "fr": {
                    "browserTarget": "showsourcing:build:fr"
                }
            }
        }
}
```
Now to run the serve with this config we have to `npm run start:fr` that is the same as `ng serve --configuration=fr`

Everytime we execute `npm run translate:fr` the `messages.fr.xlf` file will contain the original data and, if there are new `i18n` translations, it will update the file and let us know in that same file which translations are new using the target state.

In each `messages.lang.xlf` we have 3 different types of target. When we translate we will have to manually change that state, this way xliffmerge can read and update the files properly. The same author developed this [tool](https://martinroob.github.io/tiny-translator/en/#/home) in order to translate this type of files. Even if we use another kind of tool for translation, the state from 'new' to 'translated' can be changed manually with a refractor.
```
<target state='new'>Hello</target> 'new' indicates that it hasn't been translated
<target state='final'>Hello</target> 'final' indicates that it matches with our default language translation
<target state='translated'>Bonjour</target> 'translated' indicates that it has been translated
```

# Refactor List
- Status selector updates, not inside the component but above. `<status-selector-app (updateStatus)="update({id: entity.id, status: $event })>`