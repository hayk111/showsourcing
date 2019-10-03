

File used to put ideas for refactors.


# List & common behaviors

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

# Dialogs

## Common Modal

## Creation dialogs

Different mechanisms are used in the application

# Others

## ActivitiesComponent
rename to something more meaningful
rename "row" input to something more meaningful.


## Dynamic Form
too much properties passed around, we could do with a config passed down..

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