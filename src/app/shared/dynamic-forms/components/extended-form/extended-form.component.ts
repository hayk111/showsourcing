import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { ExtendedFieldDefinition } from '~core/models';
import { ExtendedField } from '~core/models/extended-field.model';
import { TrackingComponent } from '~utils/tracking-component';


@Component({
	selector: 'extended-form-app',
	templateUrl: './extended-form.component.html',
	styleUrls: ['./extended-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedFormComponent extends TrackingComponent {
	// converting fields to a map of <ExtendedFieldDefinition.id, extendedField> for easy access.
	@Input() set fields(fields: ExtendedField[]) {
		const arr: any = (fields || []).map(field => ([field.definition.id, field]));
		this._fieldMap = new Map(arr);
		this._fields = fields;
	}
	private _fields: ExtendedField[];
	private _fieldMap: Map<string, ExtendedField>;


	@Input() definitions: ExtendedFieldDefinition[];
	/** some forms have inline labels which is very annoying but w.e */
	@Input() inlineLabel: boolean;
	@Output() update = new EventEmitter<{ extendedFields: ExtendedField[] }>();

	constructor(
	) { super(); }

	getFieldForDefinition(id: string) {
		return this._fieldMap.get(id);
	}

	onUpdate(field: ExtendedField) {
		const updatedFields = this._fields.filter(f => f.id !== field.id).concat(field);
		this.update.emit({ extendedFields: updatedFields });
	}

}
