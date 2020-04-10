`<selector-app>` is a component for selecting a value from a set of options, similar to the native
`<select>` element.

To use the `<selector-app>`, you need to specify the `typename` property with possible `Typename` values declared in the `erm3/typename.ts` file 

<!-- example(<selector-app typename="Product"></selector-app>) -->

### Getting and setting the select value

The `<mat-select>` supports 2-way binding to the `value` property without the need for Angular
forms.

### Disabling the select or individual options

It is possible to disable the entire select or individual options in the select by using the
disabled property on the `<select>` or `<mat-select>` and the `<option>` or `<mat-option>` elements respectively.

<!-- example(select-disabled) -->

### Resetting the select value

If you want one of your options to reset the select's value, you can omit specifying its value.

<!-- example(select-reset) -->

### Creating groups of options

The `<mat-optgroup>` element can be used to group common options under a subheading. The name of the
group can be set using the `label` property of `<mat-optgroup>`. Like individual `<mat-option>`
elements, an entire `<mat-optgroup>` can be disabled or enabled by setting the `disabled` property
on the group.