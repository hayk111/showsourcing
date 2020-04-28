import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter,
	Input, Output, ContentChild, HostListener
} from '@angular/core';
import { InputDirective } from '~shared/inputs';



@Component({
	selector: 'editable-container-app',
	templateUrl: './editable-container.component.html',
	styleUrls: ['./editable-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.open]': 'isOpen',
		'[class.clickable]': '!isOpen && !readonly',
		'[class.with-overflow]': 'hasOverflow'
	}
})
export class EditableContainerComponent {
	@Input() isOpen = false;
	/** Whether click on the value should open the editor */
	@Input() readonly = false;
	@Input() closeOnOutsideClick = true;
	/** whether we display cancel / save buttons */
	@Input() hasAction = true;
	/** whether there is an overflowing background on hover */
	@Input() hasOverflow = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<null>();
	@Output() saved = new EventEmitter<null>();
	@Output() canceled = new EventEmitter<null>();
	@ContentChild(InputDirective) input: InputDirective;

	constructor(private cd: ChangeDetectorRef) { }

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

}