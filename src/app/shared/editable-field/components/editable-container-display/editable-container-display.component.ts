import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'editable-container-display-app',
	templateUrl: './editable-container-display.component.html',
	styleUrls: ['./editable-container-display.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexVAlign]': 'vAlign',
		'[class.pointer]': '!disabled',
		'[class.txt-btn]': '!disabled'
	}
})
export class EditableContainerDisplayComponent implements OnInit {

	@Input() vAlign = true;
	@Input() disabled = false;

	constructor() { }

	ngOnInit() {
	}

}
