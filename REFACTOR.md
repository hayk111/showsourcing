

File used to put ideas for refactors.


# strategy
Since there is quite a lot to do I suggest we remove every non used files before doing anything so it doesn't blur our field of view.

Also since the app has gained some structure we can also structure the code quite a bit with that. I suggest we take a look at the big thing and see what's the best course of action. Also proceding incrementally would be nice as to not change everything at once.

Maybe we can have a document with that just list the functions used in:

  - list
	- details
	- dialogs

for each entity and see what to do.

# Styling
Remove non used colors from palette.scss
Remove non used spacing from spacing.scss
Clean Typography.scss
Add horizontal (h) and vertical (v) mg-, pd- classes.

# List & common behaviors

## Common behavior:
we have common behaviors like archive, open creation task dlg etc that are on either list srv, abstractTaskComopnent
or sprinked a bit every where, we could regroup them in a service. A super class component is annoying when you want 
to use things from abstractTask and abstractSample at the same time


## Refetch Subscription In list page service
In list-page.service every funciton is subscribed except refetch


## controller list
	- remove smart search thing or at least do smtg about it
	- show & hide could be changed to toggle
	- the service doesn't keep the state, then maybe we shouldn't keep the state 
		anymore in the ListSrv. That service doesn't make sens anyway as things could be directly on the listSrv


## GlobalService
We could add the archive method and add in `tap(_ => notificationSrv.showNotif())`. Same for delete.
I mean we have to find solution generally so we don't need to duplicate this shit.

## List Update.
Add list update to global service

## Make Base component with basic functionalities
such as:

 - erm
 - trackFunction
 - destroy$ ? maybe not this one though could be expesive..
 - debug code


## more use of super class for common behavior

For example the page supplier task extends AbstractTaskCommonComponent and has common behaviors for tasks, which is useful. Dunno who did that but it was useful.

Or maybe the List Service could be extended so we'd have ProductListService, SupplierListSrv, etc.. 


## refactor of the list component


## refactor of the common module

Some order needs to be set in that module, we have creation dialogs, tables etc. Maybe all those things could go in shared, idk, it should be organised a bit.

## common tables
  - could handle events as previously suggested by eric. and also send @Output in events so it can be used externally if needed ? Maybe that's a bad idea though

# Selection Bars

  - Make a selection bar for each entity

# Dialogs

# Card

  - margin and padding should be done via class, to do so, we need to have `card-content-app`
	```
	<card-app class="mg-s">
		<card-content class="pd-s"><>
	```

## Common Modal

## Creation dialogs

Different mechanisms are used in the application

# Others

## ActivitiesComponent
rename to something more meaningful
rename "row" input to something more meaningful.


## Dynamic Form
We need to refactor it to make it less error prone.
We need to refactor those modules first:

  - editable
	- input
	- selector

Then analyse what can be done

## Table dynamic columns
The name and ref column second line could be customized via a template, because they change often

## Table Placeholder

	- it's not customizable enough
	- table should be agnostic of where it's used.

	so either we put the place holders outside the table, either we make inputs like [placeHolderTitle], [placeholderAction] etc.
	Outside would be easier to test, therefor it's probably a better design.

# Upload Service

	Rework so it doesn't do so much shit. Especially:
	 - shouldn't link to the entity
	or idk, it was added there because it wouldn't link after the upload if we switched components


# Selectors

# Remove Legacy colors

# Filters 

## Filter Panel
  - Filter panel need to be refactored to make it easier to understand


# sidebar

  subnav items should be in html

# erm

add ERM pipe instead of having `erm = ERM;` this on components