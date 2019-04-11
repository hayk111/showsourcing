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
		if (rows)
			// we map all the fields so we can iterate them on the column loop
			this.fields = rows.map(row => row.reply.fields);
		else
			this.fields = [];
	}
	get rows() {
		return this._rows;
	}
	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	// is matrix since we need to iterate over requestElement and then over requestElement.reply.fields
	// M[i][j] -> i: request element rows // j: fields
	fields: ExtendedField[][];

	constructor() { super(); }

	getPrice(item: any) {
		return item ? JSON.parse(item) : undefined;
	}

}
