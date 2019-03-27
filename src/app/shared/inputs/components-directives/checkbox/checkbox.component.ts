import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs/components-directives/abstract-input.class';

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
	@ViewChild('label') label: ElementRef;
	@Input() size = 16;
	@Input() labelClass = '';
	/** id of element, if not specified it will generate automtically */
	@Input()
	get id(): string { return this._id; }
	set id(value: string) { this._id = value; }
	protected _id: string = 'checkbox-' + CheckboxComponent.NEXT_UID++;
	/**
   * Whether the checkbox is checked.
   */
	@Input()
	get checked(): boolean { return this._checked; }
	set checked(value: boolean) {
		this._checked = value;
	}
	private _checked = false;

	/** Whether the checkbox is required. */
	@Input()
	get required(): boolean { return this._required; }
	set required(value: boolean) { this._required = value; }
	private _required: boolean;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	/** Toggles the `checked` state of the checkbox. */
	toggle(): void {
		this.checked = !this.checked;
		this.value = this.checked;
	}

	/**
	 * Event handler for checkbox input element.
	 * Toggles checked state if element is not disabled.
	 */
	onClick() {
		if (!this.disabled) {
			this.toggle();
			this.emit();
		}
	}

	private emit() {
		if (this.onChangeFn)
			this.onChangeFn(this.checked);
		this.update.emit(this.checked);
		if (this.checked) {
			this.check.emit();
		} else {
			this.uncheck.emit();
		}
	}

	hasContent() {
		return this.label.nativeElement.children.length === 0;
	}

	uncheckedStyle() {
		// it's -2 since the div of the unchecked grows by 2 for some reason
		const unWidth = this.size - 2;
		const unHeight = this.size - 2;
		return {
			width: `${unWidth}px`,
			height: `${unHeight}px`
		};
	}

	iconSize() {
		return {
			'font-size': `${this.size}px`
		};
	}
}
