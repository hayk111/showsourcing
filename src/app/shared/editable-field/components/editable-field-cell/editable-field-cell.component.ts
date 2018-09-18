import { Component, OnInit, ChangeDetectionStrategy, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'editable-field-cell-app',
	templateUrl: './editable-field-cell.component.html',
	styleUrls: ['./editable-field-cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexBetween]': 'inlineLabel',
		'[class.flexCenter]': 'inlineLabel',
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel',
		'[class.open]': 'isOpen',
		'[class.closed]': '!isOpen',
		'[class.canGrow]': 'canGrow',
		'[class.cannotGrow]': '!canGrow',
	}
})
export class EditableFieldCellComponent {
	/** whether the label is above or inlined */
	@Input() inlineLabel = false;
	/** whether the input has a fixed height */
	@Input() canGrow = false;
	@Input() hasLabel = true;
	/** Whether click on the value should open the editor */
	@Input() editOnClick = true;
	@Input() closeOnOutsideClick = true;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<null>();
	@Output() saved = new EventEmitter<null>();
	@Output() canceled = new EventEmitter<null>();
	isOpen = false;

	@HostListener('click')
	open() {
		if (this.editOnClick) {
			this.isOpen = true;
			this.opened.emit();
		}
	}

	close() {
		if (this.closeOnOutsideClick) {
			this.isOpen = false;
			this.closed.emit();
		}
	}
}
