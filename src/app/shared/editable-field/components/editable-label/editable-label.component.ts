import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'editable-label-app',
	templateUrl: './editable-label.component.html',
	styleUrls: ['./editable-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableLabelComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
