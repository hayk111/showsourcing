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


 - `npm run build` Builds a production ready of the app in the dist directory
 - `npm run analyze` Runs the dependency reports, so we can analyze the sizes of the different modules
 - `npm run translate` Generates the source translation file `messages.xlf`
 - `npm run start:fr` Run the application with the french language configuration
 - `npm run build:fr` Builds a production ready of the app in the dist directory with the french language configuration
 - `npm run translate:fr` Translates and generates `message.xlf` `messages.fr.xlf`, also merges the old source langauge file with the new one (see Translation section)

## Devtools addon

You can download the redux addon for chrome [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). Once the app is started right click anywhere on the document and then redux to start using it.


## File Structure & guidelines

The application is divided in modules. In the module directory there is 4 sub directories: app-root, features, shared. The shared modules are modules that are used by the entirety of the app. The feature modules are module that are self-contained and deal with only one feature of the app. App root is the root of the application.

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

The theming is done in ./src/app/theming and should be straight forward. `styles.scss` is the entry point and imports everything it needs.

Spacing and palette use CSS4 variables and should be used throughout the application. CSS4 variables are used with a fallback (meaning that even if the browser doesn't support CSS4 vars it's gonna work).

Some scss files are based on google material design guidelinds. For instance `elevation.scss` is a somewhat simplified version of the file in angular material design.

## Business logic standards

please read STANDARDS.md


### AutoUnsub

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