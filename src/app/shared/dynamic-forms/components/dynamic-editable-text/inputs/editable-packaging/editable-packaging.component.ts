import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ERM } from '~core/models';
import { Packaging } from '~models/packaging.model';
import { DynamicField } from '~shared/dynamic-forms/models';
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
	}
	get value() { return this._value; }
	private _value;

	@Input() isFormStyle = false;
	@Input() disabled = false;
	@Input() customField: DynamicField;
	@Output() change = new EventEmitter<Packaging>();
	@Output() update = new EventEmitter<Packaging>();
	@Output() rowClosed = new EventEmitter();

	erm = ERM;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	onChangePackaging(prop, value) {
		if (value) this.value = { ...this.value, [prop]: value };
		this.onChange();
		this.update.emit(this.value);
	}

	onClose(isCancel) {
		if (!isCancel) {
			this.value = this.value;
			this.onChange();
		}
		this.rowClosed.emit(isCancel);
	}

	writeValue(value: any): void {
		if (value === null)
			return;
		this.value = value;
		this.cd.markForCheck();
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit(this.value);
	}

}
