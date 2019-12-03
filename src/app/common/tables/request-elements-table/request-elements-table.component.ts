import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { ExtendedField, RequestElement } from '~core/models';
import { ID } from '~utils';
import { TranslateService } from '@ngx-translate/core';

const tableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 190, sortable: false },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	fields: { name: 'fields', translationKey: 'fields', width: 190, sortable: false },
	sender: { name: 'sender', translationKey: 'sender', width: 190, sortable: false },
};

/**
 * Yesterday I saw a guy spill all his Scrabble letters on the road. I asked him, “What’s the word on the street?”
 */

@Component({
	selector: 'request-elements-table-app',
	templateUrl: './request-elements-table.component.html',
	styleUrls: [
		'./request-elements-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementsTableComponent extends EntityTableComponent<RequestElement> {
	columns = ['name', 'status'];
	tableConfig = tableConfig;
	/** whether we want to show the reply fields */
	@Input() showReplyFields = true;

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

	constructor(public translate: TranslateService) { super(); }

	parseJson(item: any) {
		return item ? JSON.parse(item) : undefined;
	}

}
