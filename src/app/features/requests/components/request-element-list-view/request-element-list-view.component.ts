import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ExtendedField, RequestElement, Price } from '~core/models';

@Component({
	selector: 'request-element-list-view-app',
	templateUrl: './request-element-list-view.component.html',
	styleUrls: [
		'./request-element-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementListViewComponent extends ListViewComponent<RequestElement> {

	private _rows: Array<RequestElement>;
	@Input() set rows(rows: Array<RequestElement>) {
		this._rows = rows;
		this.prices = [];
		if (rows) {
			// we map all the fields so we can iterate them on the column loop
			this.fields = rows.map(row => {
				// we need to map all the fields, since we use the index to access the price in case if there is any, we need the order
				// in case the field is not type price will be just undefined inside the matrix
				this.prices.push(row.reply.fields.map(field => {
					if (field.definition.type === 'price') {
						return field.value ? JSON.parse(field.value) : {};
					}
				}));
				return row.reply.fields;
			});
			console.log(this.fields);
			console.log(this.prices);
		} else
			this.fields = [];
	}
	get rows() {
		return this._rows;
	}
	@Output() openRequestDlg = new EventEmitter<null>();

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	// both are matrix since we need to iterate over requestElement and then over requestElement.reply.fields
	// M[i][j] -> i: request element rows // j: fields
	fields: ExtendedField[][];
	prices: Price[][];

	constructor() { super(); }

}
