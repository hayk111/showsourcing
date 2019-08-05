import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ExtendedField, ExtendedFieldDefinition } from '~core/models';
import { AutoUnsub } from '~utils';


@Component({
	selector: 'extended-form-app',
	templateUrl: './extended-form.component.html',
	styleUrls: ['./extended-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedFormComponent extends AutoUnsub implements OnInit, OnChanges {
	// converting fields to a map of <ExtendedFieldDefinition.id, extendedField> for easy access.
	@Input() set fields(fields: ExtendedField[]) {
		const arr: any = (fields || []).map(field => ([field.definition && field.definition.id, field]));
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
	@Input() disabled = false;
	@Input() autofocus = false;
	// index where the focus starts
	@Input() indexFocus = 0;
	@Output() update = new EventEmitter<ExtendedField[]>();
	cols: ExtendedField[][];
	update$ = new Subject<ExtendedField[]>();

	constructor(
	) { super(); }

	ngOnInit() {
		if (this.isFormStyle)
			this.update$.pipe(
				takeUntil(this._destroy$),
				// we use this timer for the debounce only on formstyle, since the update inputs work like
				// (input) rather than (blur) this means that we would have to update
				// each time the person types something on an input
				// this time is the perfect time between typing slow and fast (fast works with 300 tbh)
				// but when typing slow since it updates then receive the new info it overrides the input
				// and creates a wanky display
				// protip: this could go on a lower level component like extende-form-input, applying a debounce time on
				// the input, but sadly it doesn't work cause of the same wanky display issue stated above
				debounceTime(750)
			).subscribe(extendedField => this.update.emit(extendedField));
	}

	ngOnChanges() {
		this.makeCols();
	}

	getFieldForDefinition(id: string) {
		return this._fieldMap.get(id);
	}

	onUpdate(field: ExtendedField) {
		let updatedFields;
		if (field.value !== undefined)
			updatedFields = this._fields.filter(f => f.id !== field.id).concat(field);
		else
			updatedFields = this._fields;

		this.isFormStyle ? this.update$.next(updatedFields) : this.update.emit(updatedFields);
	}

	/** put the custom fields into columns
 * If we have only one column then we will have one column with all the fields
 * If we have two columns we will have 2 columns with each half the field, etc..
 */
	makeCols() {
		this.cols = [];
		const fields = this.definitions;
		if (fields) {
			const fieldPerCol = Math.ceil(fields.length / this.colAmount);
			for (let i = 0; i < this.colAmount; i++) {
				const start = i * fieldPerCol;
				const end = i * fieldPerCol + fieldPerCol;
				this.cols[i] = fields.slice(start, end);
			}
		}
	}

}
