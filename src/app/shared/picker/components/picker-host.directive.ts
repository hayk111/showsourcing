import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[pickerHostApp]'
})
export class PickerHostDirective {

	constructor(public viewContainerRef: ViewContainerRef) { }

}
