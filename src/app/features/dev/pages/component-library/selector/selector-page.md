# Selector

`<selector-app>` is a component for selecting a value from a set of options

To use the `<selector-app>`, you need to specify the `typename` property with possible `Typename` values declared in the `erm3/typename.ts` file

### Property Inputs
* `typename` (**Typename**) - the type of the selector entity
* `customType` (**string**) - custom type, this one is used only with the `typename` of **PropertyOption**
* `canCreate` (**boolean**) - whether to display the "Create" button in the selector picker
* `typename` (**string**) - the type of the selector entity

## Example Usage of a Simple Selector

```html
<selector-app
	typename="ENTITY_TYPE_NAME"
	[canCreate]="true"
	(update)="update($event)">
	<button class="mg-ms">ENTITY_TYPE_NAME selector</button>
</selector-app>
```

## Example Usage of a Property Option Selector

```html
<selector-app
	typename="PropertyOption"
	customType="CUSTOM_TYPE_NAME"
	[canCreate]="true"
	(update)="update($event)">
	<button class="mg-ms">CUSTOM_TYPE_NAME selector</button>
</selector-app>
```