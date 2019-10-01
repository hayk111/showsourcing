

File used to put ideas for refactors.


# more use of super class for common behavior

For example the page supplier task extends AbstractTaskCommonComponent and has common behaviors for tasks, which is useful. Dunno who did that but it was useful.

Or maybe the List Service could be extended so we'd have ProductListService, SupplierListSrv, etc.. 


# refactor of the list component


# refactor of the common module

Some order needs to be set in that module, we have creation dialogs, tables etc. Maybe all those things could go in shared, idk, it should be organised a bit.

# Creation dialogs

Different mechanisms are used in the application

# ActivitiesComponent
rename to something more meaningful
rename "row" input to something more meaningful.


# Dynamic Form
too much properties passed around, we could do with a config passed down..

# Table dynamic columns
The name and ref column second line could be customized via a template, because they change often

# Table Placeholder
Should be put outside the table because:
	- it's not customizable enough
	- table should be agnostic of where it's used.