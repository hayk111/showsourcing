import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'editable-label-app',
	templateUrl: './editable-label.component.html',
	styleUrls: ['./editable-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexVAlign]': 'vAlign'
	}
})
export class EditableValueComponent implements OnInit {
	@Input() vAlign = true;

	constructor() { }

	ngOnInit() {
	}

}
