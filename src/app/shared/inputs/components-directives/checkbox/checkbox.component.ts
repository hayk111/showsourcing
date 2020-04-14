import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs/components-directives/abstract-input.class';
import { TabFocusActionDirective } from '~shared/utils';

@Component({
	selector: 'checkbox-app',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	providers: [makeAccessorProvider(CheckboxComponent)]
})
export class CheckboxComponent extends AbstractInput {
	protected static NEXT_UID = 0;
	@Output() update = new EventEmitter<boolean>();
	@Output() check = new EventEmitter<null>();
	@Output() uncheck = new EventEmitter<null>();
	@ViewChild('label', { static: true }) label: ElementRef;
	@Input() size = 16;
	// if the checkbox should be autofocussed
	@Input() autoFocus = false;
	@ViewChild(TabFocusActionDirective, { static: true }) tab: TabFocusActionDirective;

	/** id of element, if not specified it will generate automtically */
	@Input()
	get id(): string { return this._id; }
	set id(value: string) { this._id = value; }
	protected _id: string = 'checkbox-' + CheckboxComponent.NEXT_UID++;

	/** Toggles the `checked` state of the checkbox. */
	toggle(): void {
		if (!this.disabled) {
			this.value = !this.value;
		}
		this.emit();
	}

	/**
	 * Event handler for checkbox input element.
	 * Toggles checked state if element is not disabled.
	 */
	onClick(event?: MouseEvent) {
		if (event)
			event.stopPropagation();
		if (!this.disabled && !this.readonly) {
			this.toggle();
		}
	}


	private emit() {
		this.onChangeFn(this.value);
		this.onTouchedFn(this.value);
		this.update.emit(this.value);
		if (this.value) {
			this.check.emit();
		} else {
			this.uncheck.emit();
		}
	}

	hasContent() {
		return this.label.nativeElement.children.length === 0;
	}

	iconSize() {
		return {
			'height': `${this.size}px`,
			'width': `${this.size}px`
		};
	}

	getClassList() {
		return {
			'mg-right-s': this.hasContent,
			'readonly': this.readonly || this.disabled,
			'checked': this.value,
			'unchecked': !this.value
		};
	}

}
