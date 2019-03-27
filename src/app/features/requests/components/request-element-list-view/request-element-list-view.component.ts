import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ExtendedField, RequestElement } from '~core/models';

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
		let firstRow, reply;
		if (rows && (firstRow = rows[0]) && (reply = firstRow.reply) && reply.fields && reply.fields.length)
			this.fields = rows[0].reply.fields;
		else
			this.fields = [];
	}
	get rows() {
		return this._rows;
	}
	@Output() openRequestDlg = new EventEmitter<null>();

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;
	fields: ExtendedField[];

	constructor() { super(); }

	getType(row: RequestElement) {
		switch (row.name) {
			case 'accepted':
				return 'success';
			case 'toReview':
				return 'primary';
			case 'sentToSupplier':
				return 'accent';
			default:
				return 'secondary';
		}
	}

}
