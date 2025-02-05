import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { EditableContainerComponent } from '~shared/editable-field/components/editable-container/editable-container.component';

@Component({
	selector: 'editable-field-app',
	templateUrl: './editable-field.component.html',
	styleUrls: ['./editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flex]': 'true',
		'[class.flexVAlign]': 'inlineLabel',
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel',
		'[class.open]': 'isOpen',
		'[class.closed]': '!isOpen',
		'[class.canGrow]': 'canGrow',
		'[class.cannotGrow]': '!canGrow',
		'[class.alignCenter]': 'align === "center"',
		'[class.alignRight]': 'align === "right"'
	}
})
export class EditableFieldComponent {
	/** whether the label is above or inlined */
	@Input() inlineLabel = false;
	/** whether we align the field on the right or center for inline labels */
	@Input() align: 'center' | 'right' = 'center';
	/** whether the input has a fixed height */
	@Input() canGrow = false;
	@Input() hasLabel = true;
	/** Whether click on the value should open the editor */
	@Input() openOnClick = true;
	@Input() closeOnOutsideClick = true;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<boolean>();

	@ViewChild(EditableContainerComponent, { static: true }) editable: EditableContainerComponent;
	isOpen = false;


	@HostListener('click')
	open() {
		if (this.openOnClick && !this.isOpen) {
			this.editable.open();
		}
	}

	onOpened() {
		this.isOpen = true;
		this.opened.emit();
	}

	close() {
		if (this.closeOnOutsideClick && this.isOpen) {
			this.editable.close();
		}
	}

	onClosed(isCancel: boolean) {
		this.isOpen = false;
		this.closed.emit(isCancel);
	}

}
