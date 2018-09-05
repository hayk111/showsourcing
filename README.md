# Supplier Show Sourcing Web App


## Overview of the documentation

The goal of this readme is to present the guidelines followed throughout the application and furnish a clear path to follow to understand the app.

## Table of Content

 - Running the app
 - Other Scripts
 - File structure
 - Style structure
 - Global Services


## Running the app

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


## File Structure & guidelines

At the root of src we have

 ```
  - app-root: small folder containing only the root module and root component
  - features: folder containing feature modules (pages)
  - global-services: folder containing the main business logic of accessing the back-end.
  - models: containing the models for the different entities used throughout the app
  - shared: folder containing modules shared between feature-modules
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

## Style Structure

The theming is done in ./src/app/theming and should be straight forward. `styles.scss` is the entry point and imports everything it needs.

Spacing and palette use CSS4 variables and should be used throughout the application. CSS4 variables are used with a fallback (meaning that even if the browser doesn't support CSS4 vars it's gonna work).

Some scss files are based on google material design guidelinds. For instance `elevation.scss` is a somewhat simplified version of the file in angular material design.

## Global Services

When accessing the db for an entity we use its global service. For example if we want to access the ProductVotes in the database we will use `ProductVoteService` that is
located in `src/global-services`. If you open the file you'll notice the file is quite empty, the class `ProductVoteService` merely extends GlobalService that does the heavy lifting.

There is 3 important classes to understand to get how this works.


#### QueryBuilder

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

#### GlobalQueries

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


#### GlobalService

`GlobalService` adds crud operations, and more to the services extending it. It will do heavy logging and do some other behind the scene work. To do the querying automatically it uses the `QueryBuilder`. It also uses

```
	/**
	 * Query one item by id, (query, optimistic UI)
	 * @param id : id of the entity selected
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 */
	queryOne(id: string, fields?: string | string[], client: string = this.defaultClient): Observable<T> {
		fields = this.getFields(fields, this.fields.one); // == fields || this.fields.one
		const gql = this.queryBuilder.queryOne(fields);
        // ...
    }
```

The first line of the method `fields = this.getFields(fields, this.fields.one);` is more or less equivalent to `fields || this.fields.one`.
`this.fields.one` is the `one` from the `GlobalQueries` explained above.

This second line will call `queryBuilder.queryOne(fields)` with the fields it got above.


## AutoUnsub

To prevent memory leaks, components which are using observables should extend the class `AutoUnsub` and use the `takeUntil` method on observable. This will automatically unsubscribe from observables when the component is destroyed.
The AutoUnsub class should be used as a standard app wise.


### Translation

(13/06/18)

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