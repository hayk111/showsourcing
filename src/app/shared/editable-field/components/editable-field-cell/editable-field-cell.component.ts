import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { EditableTextComponent } from '~shared/editable-field/components/editable-text/editable-text.component';

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

	@ViewChild(EditableTextComponent) editable: EditableTextComponent;
	isOpen = false;

	@HostListener('click')
	open() {
		if (this.editOnClick) {
			this.isOpen = true;
			this.editable.open();
			// we send the event once the thing is actually opened
			setTimeout(_ => this.opened.emit());
		}
	}

	close() {
		if (this.closeOnOutsideClick) {
			this.isOpen = false;
			this.editable.close();
			setTimeout(_ => this.closed.emit());
		}
	}
}
