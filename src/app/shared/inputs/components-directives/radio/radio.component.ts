import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs/components-directives/abstract-input.class';

@Component({
	selector: 'radio-app',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss'],
	providers: [makeAccessorProvider(RadioComponent)],
})
export class RadioComponent extends AbstractInput {
	protected static NEXT_UID = 0;

	@Input() isVeritical = false;
	@Output() update = new EventEmitter<boolean>();
	@Output() select = new EventEmitter<null>();
	/** list of possible values and labels */
	@Input()
	items: any[];

	/** id of element, if not specified it will generate automtically */
	@Input()
	get id(): string { return this._id; }
	set id(value: string) { this._id = value; }
	protected _id: string = 'radio-' + RadioComponent.NEXT_UID++;
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

	/**
	 * Event handler for checkbox input element.
	 * Toggles checked state if element is not disabled.
	 * @param event
	 */
	onClick() {
		if (!this.disabled) {
			this.emit();
		}
	}

	private emit() {
		if (this.onChangeFn)
			this.onChangeFn(this.checked);
		this.update.emit(this.checked);
		this.select.emit();
	}

	getId(index) {
		return this._id + '-' + index;
	}

	writeValue(value: any): void {
		super.writeValue(value);
	}
}
