import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
	selector: 'label-app',
	templateUrl: './label.component.html',
	styleUrls: ['./label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {

	constructor(protected _element: ElementRef) { }

	set for(id: string) {
		this._element.nativeElement.for = id;
	}

}
