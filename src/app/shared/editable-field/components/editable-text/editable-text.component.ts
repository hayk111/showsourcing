import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
	selector: 'editable-text-app',
	templateUrl: './editable-text.component.html',
	styleUrls: ['./editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.open]': 'isOpen'
	}
})
export class EditableTextComponent {
	@Input() isOpen = false;
	/** Whether click on the value should open the editor */
	@Input() openOnClick = true;
	@Input() closeOnOutsideClick = true;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<boolean>();

	constructor(private cd: ChangeDetectorRef) { }

	close(isOutsideClick?: boolean, isCancel?: boolean) {
		if (!this.isOpen || (isOutsideClick && !this.closeOnOutsideClick)) {
			return;
		}

		this.isOpen = false;
		this.cd.markForCheck();
		setTimeout(_ => this.closed.emit(isCancel));
	}

	/** does not send a close event */
	cancel() {
		this.close(false, true);
	}

	save() {
		this.close(false);
	}

	open(isInsideClick?: boolean) {
		// if the click was made from the template of this component
		// and the editOnClick is disabled we shouldn't open the edit mode.
		// this will allow us to have some editable text that are only opened via a button and such.
		if (this.isOpen || (isInsideClick && !this.openOnClick)) {
			return;
		}
		this.isOpen = true;
		// we send the opened event when it's actually opened
		setTimeout(_ => this.opened.emit());

		this.cd.markForCheck();

	}

}
