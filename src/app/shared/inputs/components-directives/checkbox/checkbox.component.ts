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
	@Input() disabled = false;
	@ViewChild(TabFocusActionDirective, { static: true }) tab: TabFocusActionDirective;

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

	// (alias for checked)
	@Input()
	get value(): boolean { return this._checked; }
	set value(value: boolean) {
		this._checked = value;
	}

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
		if (!this.disabled) {
			this.checked = !this.checked;
			this.cd.markForCheck();
		}
	}

	/**
	 * Event handler for checkbox input element.
	 * Toggles checked state if element is not disabled.
	 */
	onClick(event?: MouseEvent) {
		if (event)
			event.stopPropagation();
		if (!this.disabled) {
			this.toggle();
			this.emit();
		}
	}

	focusClick() {
		if (!this.disabled) {
			this.onClick();
			this.tab.focus();
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

	iconSize() {
		return {
			'height': `${this.size}px`,
			'width': `${this.size}px`
		};
	}

	// Implemented as part of ControlValueAccessor.
	// to give accessor its formControl value associated to it
	writeValue(value: any): void {
		this.checked = value;
		this.cd.markForCheck();
	}

}
