import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { ExtendedField, RequestElement, ERM } from '~core/models';
import { ID } from '~utils';

const tableConfig: TableConfig = {
	name: { title: 'name', translationKey: 'name', width: 190, sortable: false },
	status: { title: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
};


@Component({
	selector: 'request-element-table-app',
	templateUrl: './request-element-table.component.html',
	styleUrls: [
		'./request-element-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementTableComponent extends EntityTableComponent<RequestElement> {
	columns = ['name', 'status'];
	@Input() tableConfig = tableConfig;

	private _rows: Array<RequestElement>;
	@Input() set rows(rows: Array<RequestElement>) {
		this._rows = rows;
		this.fields = rows ? rows.map(row => row.reply.fields) : [];
	}
	get rows() {
		return this._rows;
	}
	@Input() hasSelection = true;

	@Output() openReviewRequestReply = new EventEmitter<string>();
	@Output() openRefuseReplyDlg = new EventEmitter<ID>();
	@Output() cancelReply = new EventEmitter<ID>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	// is matrix since we need to iterate over requestElement and then over requestElement.reply.fields
	// M[i][j] -> i: request element rows // j: fields
	fields: ExtendedField[][] = [];
	erm = ERM;

	constructor() { super(); }

	parseJson(item: any) {
		return item ? JSON.parse(item) : undefined;
	}

}
