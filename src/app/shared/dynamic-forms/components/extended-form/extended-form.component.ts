import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ExtendedField, ExtendedFieldDefinition } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';


@Component({
	selector: 'extended-form-app',
	templateUrl: './extended-form.component.html',
	styleUrls: ['./extended-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedFormComponent extends TrackingComponent implements OnInit {
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
	@Input() isFormStyle = false;
	@Input() colAmount = 1;
	@Output() update = new EventEmitter<ExtendedField[]>();
	cols: ExtendedField[][];

	constructor(
	) { super(); }

	ngOnInit() {
		this.makeCols();
	}

	getFieldForDefinition(id: string) {
		return this._fieldMap.get(id);
	}

	onUpdate(field: ExtendedField) {
		const updatedFields = this._fields.filter(f => f.id !== field.id).concat(field);
		this.update.emit(updatedFields);
	}

	/** put the custom fields into columns
 * If we have only one column then we will have one column with all the fields
 * If we have two columns we will have 2 columns with each half the field, etc..
 */
	makeCols() {
		this.cols = [];
		const fields = this.definitions;
		const fieldPerCol = Math.ceil(fields.length / this.colAmount);
		for (let i = 0; i < this.colAmount; i++) {
			const start = i * fieldPerCol;
			const end = i * fieldPerCol + fieldPerCol;
			this.cols[i] = fields.slice(start, end);
		}
	}

}
