# Supplier Show Sourcing Web App

# Table of Content
 - [Running the app](#running-the-app)
 - [Semantic version](#semantic-version)
 - [Branching system](#branching-system)
 - [Git golden rules](#git-golden-rules)
 - [Other scripts](#other-scripts)
 - [File structure](#file-structure)
 - [Style structure](#style-structure)
 - [Code style](#code-style)
 - [Entity services](#entity-services)
 - [List page service](#list-page-service)
 - [Auto unsub](#auto-unsub)
 - [Translation](#translation)


# Overview of the documentation
The goal of this readme is to present the guidelines followed throughout the application and furnish a clear path to follow to understand the app.

# Running the app
No surprise here

```
git clone this_repo
cd project
npm i
npm start
1
```

***

# Semantic version

## Production
Each time we release a new version we must create a Tag
X.Y.Z
X -> Major: Changes that implicates refactoring a huge/core part of the app that affects many components at the same time
Y -> Minor: Changes like adding new features or fixing major/blocking bugs
Z -> Patch: Changes like bug-fix

## Development & Staging
X.Y.Z-BN
X, Y, Z -> Same as above
BN -> Prerelease: build number increase

## How to use versioning
In order to use this release versioning, we use `npm version`
e.g. on it's behaviour: `version: 2.6.0`
|     Version    | Command ( npm version ) | Comment                                                                                                                              |
|:--------------:|:-----------------------:|--------------------------------------------------------------------------------------------------------------------------------------|
| 2.6.0          |                         |                                                                                                                                      |
|                | minor                   | This is just a test so you can see what happens when we are already in minor                                                         |
| 2.7.0          |                         |                                                                                                                                      |
|                | preminor                | Everytime we are going to jump for the next version, we will use pre-minor. This way we can  increase the build number in the future |
| 2.8.0-0        |                         |                                                                                                                                      |
|                | preminor                | This is just a test so you can see what  happens when we are already in preminor                                                     |
| 2.9.0-0        |                         |                                                                                                                                      |
|                | prerelease              | we update only the build number here                                                                                                 |
| 2.9.0-1        |                         |                                                                                                                                      |
|    ·    ·    · | prerelease              | we use prerelease 7 times more                                                                                                       |
| 2.9.0-8        |                         |                                                                                                                                      |
|                | minor                   | We decide that this is the final version and we are going to deploy.                                                                 |
| 2.9.0          |                         | we deploy and create a tag with this version                                                                                         |
|                | preminor                | We start again the development for the new version                                                                                   |
| 2.10.0-0       |                         |                                                                                                                                      |
|                | prerelease              |                                                                                                                                      |
This same behaviour can be used for the other 2 commands `major` and `patch`

***

# Branching system

## Protected branches
We have 2 protected branches:
- Master: latest stable version of the web app that has been pushed to production, this branch *should NOT* be touched unless we need a [hotfix](#hotfixes) or we are pushing a new build/deploy to production. In case of hotfix, read the section below.
Master will *NEVER* be merged on other branches, other branches are merged into master
- Development: all new features start on this branch, only finished and reviewed features can be merged here. This branch will create the staging/app2 build/deploy.

## Methodology
This would be the flow between branches
![branch flow](branches-flow.png)

For a `feature` branch we checkout from `development`, but normally it's a heavy MR to review. After the assessment of the `feature` it is decided the size of the `feature`. If it is big we create a branch from that `feature` branch called `ticket` branch, the only purpose of this branch is to be merged on the feature branch, creating smaller PR's to review. This way its easier to keep track of the changes. e.g.
```
# we start on development branch
git checkout -b feature/number-issue-small-description
git checkout -b ticket/number-issue-small-description
# after every milestone on the feature, just create a merge request from ticket to feature
# when the feature is done from feature to development
```
For `bug` branches, we just use the normal system, checkout from `development` and merge request at the end of the fix

## Hotfixes
Hotfixes can only happen when a blocking bug in production (master) occur live. The procedure for this is to checkout from `master` and create a new branch `hotfix/number-issue-small-description`. Once this branch has the fix ready to be merged, we have to merge it on both branches `development` and `master`. This way we prevent that master has to be merged in the future on `development`. Since `development` always has to be merged on `master` and not the other way around.

## Release
When we decide that we are going to deploy, the release candiate process begins. This means that
- We checkout from `development` and create a branch `release/x.y.z`.
- When we do this step `development` is *NEVER* merged into `release/x.y.z`.
- When fixing bugs related to that release will always be done on that branch
- When the bugfixing is done, and we are ready to release, this branch will be merge into `development` and into `master`

***

# Git golden rules
- NEVER merge `master` into `development`, `development` is merged into `master` always.
- Try to avoid features inside features unless it's necessary. Doing a feature inside a feature means that we cannot release none of them until all of them are finished.
- Do not create a tag, until the version has been validated on staging.
- When a release has multiple hotfixes that has to be solved by more than 1 person, checkout a branch from `master` called `hotfix`, and from there checkout all the other hotfix branches, this way we do not corrupt `development` branch and we have all the changes visible on the hotfix branch. The previous rule is applied here too!.

***

# Other Scripts
For an up-to-date version of the scripts just open package.json and those figure in the `script` part.

You can run every script with `npm run`, for example `npm run start`.

 - `npm run build` Builds a production ready of the app in the dist directory
 - `npm run analyze` Runs the dependency reports, so we can analyze the sizes of the different modules
 - `npm run translate` Generates the source translation file `messages.xlf`
 - `npm run start:fr` Run the application with the french language configuration
 - `npm run build:fr` Builds a production ready of the app in the dist directory with the french language configuration
 - `npm run translate:fr` Translates and generates `message.xlf` `messages.fr.xlf`, also merges the old source langauge file with the new one (see Translation section)

***

# File Structure & guidelines
At the root of src/app we have

 ```
  - app-root: small folder containing only the root module and root component
  - common: folder containing functionalities shared accross the application
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

***

## Common
Folder containing modules organized by functionality, these modules hold common components used around the app, since we use it around the app they are not bound to a feature, they are bound to common.
Folder containing modules organized by functionality, the purpose of this folder is to have specific behaviour components in a common folder.


## Feature

There is two ways to organize a feature folder and that depends on wether or not a feature folder is a detail/list type or not. 


Case 1: Not a list / detail type

Features are organized this way:

```
feature
   auth
       shared
           auth-form-base
       pages
           login
              components
							   login-button.component.ts
							login-page.component.ts
							
           user
              pick-a-team
                  pick-a-team-page.component.ts
```

Inside the module:

````

import * as Pages from './pages';
import { routes } from './routes';
import * as SharedComponents from './shared';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		Pages.LoginPageComponent,
		// ...
		SharedComponents.AuthFormBaseComponent,
		// ...
	],
```

Rules:

  - A feature module name must end with `Feature`. So if we have a Product Feature the file will be product-feature.module.ts and the exported module is `ProductFeatureModule`
  - inside `pages` the folder structure must respect the url strictly
  - a page component must end with -page
	- component that are used uniquely within the page will be put at the page level under the `components` folder
  - an optional shared folder for components shared between pages but not outside this module
	- at the module level there is a distiction between pages and components.

examples:

  - http://localhost:4200/auth/login
  - http://localhost:4200/auth/user/pick-a-team


## Case 2: List / detail feature

routing is like this:

  - /products
	- /products/:id

in that case the folder structure is like this

```
features
  products
	  pages
		  products
			  products-page.component
			product-detail
			  product-detail-page.component
```

# Style Structure
The theming is done in ./src/app/theming and should be straight forward. `styles.scss` is the entry point and imports everything it needs. Inside this file we import some core styling files:

- `elevation.scss`: is a somewhat simplified version of the file in angular material design.
- `helper-classes.scss`: has different sections (display, align, text, misc...) with classes that are generally used around the app.
- `inputs-buttons.scss`: has different styles for our `form-field-app` and inputs-buttons inside the app
- `palette.scss`: has different color variables and classes used around the app
- `spacing.scss`: has different spacing variables and classes used aorund the app
- `typography.scss`: has the different font-size vairables and classes used around the app, also it contains different font and header styles.

Spacing and palette use CSS4 variables and should be used throughout the application. CSS4 variables are used with a fallback (meaning that even if the browser doesn't support CSS4 vars it's gonna work).

Some scss files are based on google material design guidelinds. For instance `elevation.scss` is a somewhat simplified version of the file in angular material design.

- h1..h5: We have default sizes for each header, so we use the same headers around the app. By default there is no `margin-bottom` but in case it wants to be added, you just have to give the class `xs, s, m, l...` to the element (these classes are defined on `typography.scss`).

***

# Code Styling

## TS File
Basic guidelines on how a structure of the file should look like
- Check that the selector name end with `-app` (by default its at the begining)
- @Inputs
- @Outputs
- @OtherDecorators
- variables
- constructor
- Lifecycle hooks
- rest of the functions

## HTML File
Basic guidelines on how the Elements should order Directives, Inputs, Outputs...
- *ngIf, *ngFor...
- `#`ids, directives
- class, ngClass
- ngStyle (we don't use style)
- Inputs
- Outputs
- i18n or any type of translation

***

# Entity Services
When accessing the db for an entity we use its entity service. For example if we want to access the ProductVotes in the database we will use `ProductVoteService`. If you open the file you'll notice the file is quite empty, the class `ProductVoteService` merely extends GlobalService that does the heavy lifting.

So At the base of the data business logic we have a bunch of entity service that provide CRUD
functions like `queryOne`, `queryMany`, `selectOne`, `update` and so on...

The difference between `query` and `select` is that the `select` will do a subscription.
So you'll be notified of changes that happen on the back end (it could be changes from other people).

There is one special method that is `getListQuery` that return a `ListQuery`
that can be used for `refetching`, `loadMore`, etc...

## To Subscribe or not to unsubscribe, that is the question
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


***

# List Page Service
List and tables are used extensively in the application. We have a service that deals with
most of the logic for those lists. This service is called `ListPageService`. To understand this app it's paramount that one understand that first.


***

# Auto Unsub
To prevent memory leaks, components which are using observables should extend the class `AutoUnsub` and use the `takeUntil` method on observable. This will automatically unsubscribe from observables when the component is destroyed.
The AutoUnsub class should be used as a standard app wise.

***

# Translation
Using `ngx-translate`
Install the npm module: `npm install @ngx-translate/core --save`

**USAGE**

Import the `**TranslateModule**`:
In other to use ngx-translate, we have to import `TranslateModule.forRoot()` in the root NgModule of the application, ours is `AppRootModule`
```
@NgModule({
    imports: [
        BrowserModule,
        TranslateModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppRootModule { }
```
In other components we just have to import `TranslateModule`.

Configuration:
By default, there is no loader available. We can add translations manually using `setTranslation` but it is better to use a loader.
To use it, we need to install the http-loader package from @ngx-translate: `npm install @ngx-translate/http-loader --save` and then import it in `i18n.service`:
```
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'assets/i18n/', '/translations.json');
}
```

Back to the `AppRootModule`, in the `TranslateModule.forRoot()` we do some configurations: 
```
TranslateModule.forRoot({
	loader: {
		provide: TranslateLoader,
		useFactory: i18n.HttpLoaderFactory,
		deps: [HttpClient]
	}
})
```

Now we could use the `TranslateHttpLoader` to load translations from `'/assets/i18n/[lang]/translation.json'` (`[lang]` is the language that we use for our translations, for English is `en`)

Next step is init the `TranslateService` in our components:
```
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
    selector: 'test-app',
    template: `
        <div>{{ 'HELLO' | translate:param }}</div>
    `
})
export class TestAppComponent {
    param = {value: 'world'};

    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');

        translate.use('en');
    }
}
```

Now we have to define the translations, for example, in the `translation.json` for `en`, we will have this: 
```
{
    "HELLO": "hello {{ value }}"
}
```
or we can define it manually using:
```
translate.setTranslation('en', {
    HELLO: 'hello {{value}}'
});
```
The `TranslateParser` understands nested JSON objects. So we can have a translation like this:
```
{
    "HOME": {
        "HELLO": "hello {{value}}"
    }
}
```
We can access the value by using dot notation, like `HOME.HELLO`

And this is how we use the translation:
We can do it with the **pipe**: `<div>{{ 'HELLO' | translate:param }}</div>`
This is how we define the `param`: `param = { value: 'world' };`

Or we use the **directive**: `<div [translate]="'HELLO'" [translateParams]="{value: 'world'}"></div>`

Or use it like an HTML Element attribute: `<div translate [translateParams]="{value: 'world'}">HELLO</div>`

**Notice: the key we put in the param must be the same as the one that we've defined in the translation.json files, in this example it is the `value`** 

In other to edit the translations, we use the `i18n-editor`, we just have to go to [](https://github.com/jcbvm/i18n-editor) to download it and open our translation folder with it to edit

**Read more about `ngx-translate` at: [](https://github.com/ngx-translate/core)
***

# Refactor List
- Status selector updates, not inside the component but above. `<status-selector-app (updateStatus)="update({id: entity.id, status: $event })>`

***

# Apollo Cache wonkyness
Sometimes apollo cache bugs can be pretty fucking hard to debug. One instance for example is something around the lines of
`an object with this primary key was provided but already exists in the store`, this usually happens when the store cannot find something because the `__typename` wasn't specified.

Another weird bug is when you update something but the optimistic ui is not triggered.

Sometimes this can be the cause:

You query products : `{ id, supplier { id, name, categories }}` and update the supplier with `{ id, name }`.
Apollo might fail to make the optimistic UI work in this instance because the update value of the supplier isn't the same as the queried one. A fix would be to update with  `{ id, name, categories }` or just query `{ id, name }`

***

# Important sneaky hotfix to consider
This section contains tricky/sneaky fixes for the app, that are abit confusing and can make the app be a bit more complex in some occasions

- Updating empty arrays: Since we trim the entity before updating (all the non empty fields are considered for the query). This means that if we try to update and empty array, the trim function will trim it out, it just won't be considered for the query. A work around this issue was on `GlobalService` in the function `emptyArrayExceptions(key: string)`, we manually insert on the switch case which arrays have to be considered when null, in order to be updated with the empty value.
- Null status on workflows: Since the status of a sample, product, supplier... is considered as `New` when there is no status at all, sometimes we have issues with this, specially when we are working with kanban. When we want to send back a status to null, we have a fake null ID, so the kanban-col can accept the item, otherwise you can't drag to that column when the id is empty. This variable is called `NEW_STATUS_ID`.
