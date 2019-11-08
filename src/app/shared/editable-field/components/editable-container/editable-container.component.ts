import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ContentChild, HostBinding } from '@angular/core';
import { EditableDisplayComponent } from '../editable-display/editable-display.component';


@Component({
	selector: 'editable-container-app',
	templateUrl: './editable-container.component.html',
	styleUrls: ['./editable-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.open]': 'isOpen',
		'[class.clickable]': 'true',
		// TODO we need to refactor the editable module a bit so we don't need this.
		// it's actually only he editable field that does need this
		'[class.default]': 'defaultStyle'
	}
})
export class EditableContainerComponent {
	@Input() isOpen = false;
	/** Whether click on the value should open the editor */
	@Input() openOnClick = true;
	@Input() closeOnOutsideClick = true;
	@Input() hoverable = false;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	/** it has a default padding and height by default, we don't want it in some cases (editable field) */
	@Input() defaultStyle = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<boolean>();
	@ContentChild(EditableDisplayComponent, { static: true }) display: EditableDisplayComponent;

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
		this.close(false, false);
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
