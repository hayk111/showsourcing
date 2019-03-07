import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { CustomField, CustomFieldDefinition } from '~core/models/custom-field.model';


@Component({
	selector: 'custom-form-app',
	templateUrl: './custom-form.component.html',
	styleUrls: ['./custom-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormComponent extends TrackingComponent {
	// converting fields to a map of <CustomFieldDefinition.id, extendedField> for easy access.
	@Input() set fields(fields: CustomField[]) {
		const arr: any = (fields || []).map(field => ([field.definition.id, field]));
		this._fieldMap = new Map(arr);
		this._fields = fields;
	}
	private _fields: CustomField[];
	private _fieldMap: Map<string, CustomField>;


	@Input() definitions: CustomFieldDefinition[];
	/** some forms have inline labels which is very annoying but w.e */
	@Input() inlineLabel: boolean;
	@Output() update = new EventEmitter<CustomField[]>();

	constructor(
	) { super(); }

	getFieldForDefinition(id: string) {
		return this._fieldMap.get(id);
	}

	onUpdate(field: CustomField) {
		const updatedFields = this._fields.filter(f => f.id !== field.id).concat(field);
		this.update.emit(updatedFields);
	}

}
