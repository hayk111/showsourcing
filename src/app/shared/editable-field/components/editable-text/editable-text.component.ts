import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter, ContentChild } from '@angular/core';
import { InputDirective } from '~app/shared/inputs';

@Component({
	selector: 'editable-text-app',
	templateUrl: './editable-text.component.html',
	styleUrls: ['./editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTextComponent implements OnInit {
	@Input() value;
	/** Whether click on the value should open the editor */
	@Input() editOnClick = true;
	@Input() closeOnOutsideClick = true;
	@Output() closed = new EventEmitter<null>();
	@ContentChild(InputDirective) input: InputDirective;
	isOpen = false;

	constructor(private cd: ChangeDetectorRef) { }

	ngOnInit() {
	}

	close(isOutsideClick: boolean) {
		this.isOpen = false;
		this.closed.emit();
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
		this.cd.markForCheck();
		// if we passed a inputApp then we can safely focus it
		// we have to do it in a timeout because the input isn't shown yet.
		setTimeout(() => {
			if (this.input)
				this.input.focus();
		}, 0);
	}

}
