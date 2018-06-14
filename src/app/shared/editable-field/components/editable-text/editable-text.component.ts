import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter, ContentChild } from '@angular/core';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'editable-text-app',
	templateUrl: './editable-text.component.html',
	styleUrls: ['./editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTextComponent implements OnInit {
	@Input() value;
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

	constructor(private cd: ChangeDetectorRef) { }

	ngOnInit() {
	}

	close(isOutsideClick?: boolean) {
		if (isOutsideClick && !this.closeOnOutsideClick) {
			return;
		}

		this.isOpen = false;
		this.closed.emit();
		// we can open it from outside so needs for cd
		this.cd.markForCheck();
	}

	cancel() {
		this.isOpen = false;
		this.canceled.emit();
	}

	save() {
		this.isOpen = false;
		this.saved.emit();
	}

	open(isClick?: boolean) {
		// if the click was made from the template of this component
		// and the editOnClick is disabled we shouldn't open the edit mode.
		// this will allow us to have some editable text that are only opened via a button and such.
		if (isClick && !this.editOnClick) {
			return;
		}
		this.isOpen = true;
		// need to check for changes since we can open the edit mode from outside
		this.cd.detectChanges();
		this.opened.emit();
	}

}
