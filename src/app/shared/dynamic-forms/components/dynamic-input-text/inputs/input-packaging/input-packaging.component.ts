import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Packaging } from '~models/packaging.model';
import { CustomField } from '~shared/dynamic-forms/models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'input-packaging-app',
	templateUrl: './input-packaging.component.html',
	styleUrls: ['./input-packaging.component.scss', '../../common-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPackagingComponent)]
})
export class InputPackagingComponent extends AbstractInput {
	@Input() set value(v: Packaging) {
		// we add an uuid for new packaging
		this._value = v || new Packaging();
		this.accumulator = this._value;
	}
	get value() { return this._value; }
	private _value;

	@Input() customField: CustomField;
	@Output() change = new EventEmitter<Packaging>();

	accumulator: Packaging = {};

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	/** same as accumulate but the value is an object and we are changing only one field */
	accumulateNested(propName: string, value: any) {
		this.accumulator = {
			...this.value,
			[propName]: value
		};
	}

	onSave() {
		this.value = this.accumulator;
		this.onChange();
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit();
	}
}
