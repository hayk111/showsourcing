## How to use 

### Step 1: Give your dialog a name.

Place the name you have chosen in the DialogNames enum. This is done so there is no accidental typos.

### Step 3: Define your dialog 

When you want to build a dialog you can just place the content inside it. The name input is mandatory and is one of the dialogNames enum.

````
	<dialog-app [name]="dialogName">
		<ng-content></ng-content>
	</dialog-app>
```


There are other options, like displaying a title and a footer, check the dialog component for a more thorough representation.

### Use dialog

You can open the dialog via the service

example: 

````
	this.dlgSrv.open(DialogNames.PRODUCT);
```