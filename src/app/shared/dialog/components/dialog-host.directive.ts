import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[dialogHostApp]'
})
export class DialogHostDirective {

	constructor(public viewContainerRef: ViewContainerRef) { }

}
