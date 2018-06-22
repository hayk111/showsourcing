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
		'[class.hasNoBottom]': '!hasBottom',
		'[class.canGrow]': 'canGrow',
		'[class.cannotGrow]': '!canGrow',

	}
})
export class FieldCellComponent implements OnInit {
	@Input() label = '';
	@Input() inlineLabel = false;
	@Input() hasBottom = true;
	// whether the input has a fixed size
	@Input() canGrow = false;

	constructor() { }

	ngOnInit() {
	}

}
