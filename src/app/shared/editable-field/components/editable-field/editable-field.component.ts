import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { EditableTextComponent } from '~shared/editable-field/components/editable-text/editable-text.component';

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
	}
})
export class EditableFieldComponent {
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
	@Output() closed = new EventEmitter<boolean>();

	@ViewChild(EditableTextComponent) editable: EditableTextComponent;
	isOpen = false;


	@HostListener('click')
	open() {
		if (this.editOnClick && !this.isOpen) {
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
