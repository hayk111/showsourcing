import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Packaging } from '~models/packaging.model';
import { CustomField } from '~shared/dynamic-forms/models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'editable-packaging-app',
	templateUrl: './editable-packaging.component.html',
	styleUrls: ['./editable-packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePackagingComponent)]
})
export class EditablePackagingComponent extends AbstractInput {
	@Input() set value(packaging: Packaging) {
		// we add an uuid for new packaging
		this._value = packaging || new Packaging();
		this.accumulator = { ...this._value };
	}
	get value() { return this._value; }
	private _value;

	@Input() customField: CustomField;
	@Output() change = new EventEmitter<Packaging>();
	@Output() rowClosed = new EventEmitter();

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

	onClose(isCancel) {
		if (!isCancel) {
			this.value = this.accumulator;
			this.onChange();
		}
		this.rowClosed.emit(isCancel);
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit();
	}
}
