import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: 'label-app'
})
export class LabelDirective {

	constructor(protected _element: ElementRef) { }

	set for(id: string) {
		this._element.nativeElement.for = id;
	}

}
