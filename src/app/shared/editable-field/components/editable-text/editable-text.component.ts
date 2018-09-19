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
	@Input() editOnClick = true;
	@Input() closeOnOutsideClick = true;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<null>();
	@Output() saved = new EventEmitter<null>();
	@Output() canceled = new EventEmitter<null>();

	constructor(private cd: ChangeDetectorRef) { }


	close(isOutsideClick?: boolean) {
		if (isOutsideClick && !this.closeOnOutsideClick) {
			return;
		}

		this.isOpen = false;
		this.cd.markForCheck();
		setTimeout(_ => this.closed.emit());
	}

	cancel() {
		this.isOpen = false;
		this.canceled.emit();
	}

	save() {
		this.isOpen = false;
		this.saved.emit();
		this.closed.emit();
	}

	open(isClick?: boolean) {
		// if the click was made from the template of this component
		// and the editOnClick is disabled we shouldn't open the edit mode.
		// this will allow us to have some editable text that are only opened via a button and such.
		if (isClick && this.editOnClick) {
			return;
		}
		this.isOpen = true;
		// we send the opened event when it's actually opened
		setTimeout(_ => this.opened.emit());

		this.cd.markForCheck();

	}

}
