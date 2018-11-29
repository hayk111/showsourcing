# General

The app is divided like this:

- app-root : root of the application
- core : contains core functionalities
	- auth
	- apollo
	- global-services
	- list page
	  - services
		  - selection
			- ListPageData
			- ...
- common: commonly used modules like ProductCommonModule, or TaskCommonModule, but not necessarily used everywhere
  - ProductCommonModule
	- TaskCommonModule
	- QuoteCommonModule
	- ActivityCommonModule
	- CommentsCommonModule
  - ModalsModule (DialogCommonModule)
	- Filters
- shared: SharedModule containing all the decoupled modules. So we only imports SharedModule
  - all others in shared



# Specific Moves

- action bar
- activity => common
- animated stack => my review feature
- apollo => core
- badge => shared
- base component unused (trackingComponent used instead)
- card => shared
- carousel => shared
- comments => common
- context-menu => shared
- custom-dialog => common ?
- dialog => shared
- divider => shared
- dynamic-forms => shared
- editable-field => shared
- file => shared =>
- filter => common
- header => Template
- icons => shared
- image => shared
- inputs => shared
- inputs-custom => shared
- kanban => common
- likes-chart => deleted (unused)
- list-page => Core
- loaders => shared
- local-storage => Core
- moq => ProductCommonModule
- notifications => Shared
- panel => Shared
- portal => in core because the new services of cdk
- price => ProductCommon
- quote => QuoteCommon
- rating => shared
- search-autocomplete => Shared
- search-bar-animated => Shared
- selection-bar => shared
- selectors => shared
- side-menu => shared
- stage-indicator => shared / rename to stepper ?
- status => (renamed to product-stats) moved to ProductCommon
- table => shared
- tabs => deleted (unused)
- task-common => common
- template => core
- tooltip => shared / delete bcuz unused and no cdk
- top panel => template ?
- tracking-component in utils
- user-picture => shared
- workflow-action => renamed to status-selector

