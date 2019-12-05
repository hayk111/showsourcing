import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'editable-label-app',
	templateUrl: './editable-label.component.html',
	styleUrls: ['./editable-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexVAlign]': 'vAlign',
		'[class.pointer]': '!disabled',
		'[class.txt-btn]': '!disabled'
	}
})
export class EditableValueComponent implements OnInit {

	@Input() vAlign = true;
	@Input() disabled = false;

	constructor() { }

	ngOnInit() {
	}

}
