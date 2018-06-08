import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'field-cell-app',
	templateUrl: './field-cell.component.html',
	styleUrls: ['./field-cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexBetween]': 'inlineLabel',
		'[class.flexCenter]': 'inlineLabel',
		'[class.oneLine]': 'inlineLabel',
		'[class.doubleLine]': '!inlineLabel',
		'[class.hasBottom]': 'hasBottom',
		'[class.hasNoBottom]': '!hasBottom'
	}
})
export class FieldCellComponent implements OnInit {
	@Input() label = '';
	@Input() inlineLabel = false;
	@Input() hasBottom = true;

	constructor() { }

	ngOnInit() {
	}

}
