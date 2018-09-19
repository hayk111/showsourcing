import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'editable-label-app',
	templateUrl: './editable-label.component.html',
	styleUrls: ['./editable-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexVAlign]': 'true'
	}
})
export class EditableValueComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
