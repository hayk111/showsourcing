import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	QueryList,
	ViewChildren,
} from '@angular/core';
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
	@Input() disabled = false;

	/** list of possible values and labels */
	@Input() items: { name: string, value: boolean }[];

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

	@Output() change = new EventEmitter();
	@Output() update = new EventEmitter<boolean>();
	@Output() select = new EventEmitter<null>();

	@ViewChildren('inp') inps: QueryList<ElementRef>;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	onChange() {
		if (this.disabled)
			return;
		this.onChangeFn(this.checked);
		this.change.emit(this.checked);
	}

	onCheckedChange(checked: boolean) {
		if (this.disabled)
			return;
		this.checked = checked;
		this.emit();
	}

	private emit() {
		this.onChange();
		this.update.emit(this.checked);
		this.select.emit();
	}

	getId(index) {
		return this._id + '-' + index;
	}

	writeValue(value: any): void {
		if (value === null || this.disabled)
			return;
		this.checked = value;
		this.cd.markForCheck();
	}

}
