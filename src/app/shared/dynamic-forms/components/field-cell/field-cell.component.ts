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
		'[class.twoLine]': '!inlineLabel',
		'[class.isOpen]': 'isOpen',
		'[class.isClosed]': '!isOpen',
		'[class.canGrow]': 'canGrow',
		'[class.cannotGrow]': '!canGrow',
	}
})
export class FieldCellComponent implements OnInit {
	@Input() label = '';
	@Input() inlineLabel = false;
	@Input() isOpen = true;
	// whether the input has a fixed size
	@Input() canGrow = false;
	@Input() isShowLabel = true;

	constructor() { }

	ngOnInit() {
	}

}
