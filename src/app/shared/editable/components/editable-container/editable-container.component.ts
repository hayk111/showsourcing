import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
	selector: 'editable-container-app',
	templateUrl: './editable-container.component.html',
	styleUrls: ['./editable-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.open]': 'isOpen',
		'[class.clickable]': 'defaultStyle && !isOpen'
	}
})
export class EditableContainerComponent {
	@Input() isOpen = false;
	/** Whether click on the value should open the editor */
	@Input() readonly = false;
	@Input() closeOnOutsideClick = true;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<null>();
	@Output() saved = new EventEmitter<null>();
	@Output() canceled = new EventEmitter<null>();

	constructor(private cd: ChangeDetectorRef) { }

	close(isOutsideClick?: boolean) {
		if (!this.isOpen || (isOutsideClick && !this.closeOnOutsideClick)) {
			return;
		}

		this.isOpen = false;
		this.closed.emit();
		this.cd.markForCheck();
	}

	/** does not send a close event */
	cancel() {
		this.canceled.emit();
		this.close(false);
	}

	save() {
		this.saved.emit();
		this.close(false);
	}

	open() {
		if (this.isOpen || this.readonly) {
			return;
		}
		this.isOpen = true;
		// we send the opened event when it's actually opened,
		// in case we want to focus the input
		setTimeout(_ => this.opened.emit());

		this.cd.markForCheck();
	}

}
