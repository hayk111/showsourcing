import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[portalHostApp]'
})
export class PortalHostDirective {

	constructor(public viewContainerRef: ViewContainerRef) { }

}
