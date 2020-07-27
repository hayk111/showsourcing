import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter,
	Input, Output, ContentChild, HostListener
} from '@angular/core';
import { InputDirective } from '~shared/inputs';
import { ESCAPE, ENTER } from '@angular/cdk/keycodes';

@Component({
	selector: 'editable-container-app',
	templateUrl: './editable-container.component.html',
	styleUrls: ['./editable-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.open]': 'isOpen',
		'[class.full-width]': 'isFullWidth',
		'[class.fit-content]': '!isFullWidth',
		'[class.clickable]': '!isOpen && (!readonly || readonly && clickableReadonly)',
		'[class.with-overflow]': 'hasOverflow',
	}
})
export class EditableContainerComponent {
	@Input() isOpen = false;
	@Input() isModal = false;
	@Input() isFullWidth = true;
	/** Whether the editable value app should be hidden when container opened */
	@Input() hideOnOpen = false;
	/** Whether click on the value should open the editor */
	@Input() readonly = false;
	@Input() closeOnOutsideClick = true;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	/** whether there is an overflowing background on hover */
	@Input() hasOverflow = true;
	/** whether the display value div has a padding to right, used for description container */
	@Input() hasDisplayValuePadding = false;
	/** whether the readonly version is still clickable */
	@Input() clickableReadonly = false;
	/** when it opens */
	@Output() opened = new EventEmitter<null>();
	/** when it close (cancel + save included) */
	@Output() closed = new EventEmitter<null>();
	/** when save clicked */
	@Output() saved = new EventEmitter<null>();
	/** when cancel clicked */
	@Output() canceled = new EventEmitter<null>();
	@ContentChild(InputDirective) input: InputDirective;

	constructor(private cd: ChangeDetectorRef) { }

	@HostListener('document:keydown', ['$event'])
	onKeydownHandler(event: KeyboardEvent) {
		event.stopPropagation();

		if (event.keyCode === ESCAPE) {
			this.close();
		}

		if (event.keyCode === ENTER) {
			this.save();
		}
	}

	close(isOutsideClick?: boolean) {
		if (!this.isOpen || (isOutsideClick && !this.closeOnOutsideClick)) {
			return;
		}
		this.isOpen = false;
		this.closed.emit();
		// we run detect change here because on close we can lose focus of an input
		// and if there is an input inside then the error that content changed after it was
		// checked will appear
		this.cd.detectChanges();
	}

	cancel() {
		this.canceled.emit();
		this.close(false);
	}

	save(isOutsideClick = false) {
		this.saved.emit();
		this.close(isOutsideClick);
	}

	@HostListener('click')
	open() {
		if (this.isOpen || this.readonly) {
			return;
		}
		this.isOpen = true;
		// setTimeout so we send the event when it's actually really opened, on next tick
		// we also want to focus any input then
		setTimeout(_ => {
			this.opened.emit();
			if (this.input) {
				this.input.focus();
			}
		});

		this.cd.markForCheck();
	}

	editableValueVisible(): boolean {
		if (!this.isOpen || this.isOpen && !this.hideOnOpen) {
			return true;
		}

		return false;
	}
}
