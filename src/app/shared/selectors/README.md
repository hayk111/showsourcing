# Selectors

Selector -> Selector Picker -> Selector Service
Selector picker -> input + (if multiple: ) + selector options

# Selector
In charge of generating the selector options (selector-picker) via cdk-overlay-app,

	- keyboard focus (content child)
	- opning/closing
	- orientation

The transclusion declared here are not the `selector-options-rows`, it actually the clickable content of the selector. This clickable content is declared here, so we can use the CDK and we know which one is the trigger, wihtout having to declare it every single time. This also allows us to interact with the keyboard focus provided by `TabFocusActionDirective`

# Selector picker
Selector picker is in charge of displaying the different options that a selector can have. The logic inside handles the search, query list, keymanager (arrows, selection, rows style), creation of entities, filters and specific update methods.

## Dynamic Fields
Its only used when we set manually a list of items to display. Currently it only supports dynamic fields and its Type is `PICKER_FIELD`. When this Type was added we added rules around the following functions:
- selector picker:
	- `onSelect`: method that gets triggered when we select an option, here we decide which will be the value of `value`. e.g. currency: return currency.symbol (similar for country, harbour, pickerfield), by default we return the item
	- `updateSingle`: we just want to return the value, therefore the switchcase
	- `getChoices`: since we send the custom choices via `@Input`, we have to tell the `selector.service` that
- selector service:
	- `search`: we have a special case for it, where instead of refetching (since we are not using any `ListQuery`) we send the string to an observable that will trigger the filtering
	- `getDynamicFields`: instead of calling the `list query` and set up the items, we simply create an observable from the search observable and the list of dynamic fields

## Filter List
a standard filter list that will be used to filter values, when displaying and searching values

## canCreate & multiple
For can create is a double check to see if an entity can create or not, for example we shohuldn't be able to create `Harbour` or `Inco Term`. This way we prevent any sort of creation. The first check is done by displaying the button and the second check is made at `create()` where it only supports a few types of creation.
For multiple we only have this check, but its more than enough.

## Choices
Depending on the Type of the selector we will initialize the `selector.service.ts`. Each Type has an specific way to start the list.

## definitionReference Id
this property is only used when we have the Type `SELECTOR_ELEMENT`, in order to retreive which options does that selector has, we need to know which diniftionId we have to query.

## Keymanager
In order we can navigate with the arrow keys inside the selector comes from the `ActiveDescendantKeyManager`. In order for it to work, we have to:
- send the selector-options that have been rendered. This way it has all the elements that it needs to move with the keys
- all the selector-options have to implement `AbstractSelectorHighlightableComponent`, this way we have
- all selector-options must implement the `.active, :hover` class

For managing the `KeyboardEvents` we use the function `onKeydown()`, this way we control what happens when we press `ARROW_UP/DOWN` or `ENTER`.

The 'critical' part of this code is on how we select the activeItemIndex, the main issue here is that since we use `cdk virtual scrolling`, we don't have all the items rendered at first, it renders as we scroll. So this generates an issue when we want to use the `keymanager`. e.g. we have 100 elements, keymanager only detects 50 because of the virtual scroll, this means that the keymanager will loop over those 50 objects instead of the 100, until we scroll manually.
In order to solve this issue what we decided is to get all the elements via `@ViewChildren`.


## nameExists$ & searched$
we use this 2 observables as controllers
- nameExists$: indicates if the name Typed exists, in order for us to show the `create-button`
- searched$: everytime we Type we call this observable thwill trigger the search on the `selector-service`.

## Selector service
Acts as a list service for the different Types of selectors.

Each Type (EntityMetadata) has its own way of initializing the data and its own way of searching.

## update (multiple & single)
Currently update multiple does not support all the cases (only the ones that can be multiple) e.g. harbour, inco-term, supplier... are not here since we do not use ever multiple on them

## On select
Methods that gets called when a `KeboardEvent.keyCode == ENTER` or a click performed in a `selector-option-row`

# Adding a new selector
- Set a search case on `selector.service.ts`
- Set a get method, so it can retreive the items on the `selector.service.ts`
- Add new switch case to `getChoices()` and access the get method created on `selector.service.ts`
- Check if it needs a new `selector-option-row` or it can use the default one
- Check that for `updateSingular()` if it can use the default or not
- Check that for `onSelect(item)` it can use the default or not
- If that Type can create check:
	- if `checkExists()` has to check for another property besides the name.
	- `create()` needs a case for creation
- If that Type can have multiple values check:
	- `updateMultiple()`, if it can use the default or not
	- `filterValues()` if it can use the default or not
	- `isSelected()` if it can use the default or not
	- `hasName()` if it can use the default or not

