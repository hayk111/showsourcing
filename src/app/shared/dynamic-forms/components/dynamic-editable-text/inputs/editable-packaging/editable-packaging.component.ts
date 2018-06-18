import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Packaging } from '~models';
import { CustomField } from '~shared/dynamic-forms/models';
import { uuid } from '~utils';
import { AbstractInput, makeAccessorProvider, InputDirective } from '~shared/inputs';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';

@Component({
	selector: 'editable-packaging-app',
	templateUrl: './editable-packaging.component.html',
	styleUrls: ['./editable-packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePackagingComponent)]
})
export class EditablePackagingComponent extends AbstractInput {
	@Input() set value(v: Packaging) {
		// we add an uuid for new packaging
		this._value = v || { id: uuid() };
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
