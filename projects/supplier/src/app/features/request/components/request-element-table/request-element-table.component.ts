import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { EntityTableComponent } from '~core/list-page';
import { RequestElement, ERM } from '~core/orm/models';
import { ID } from '~utils';

@Component({
	selector: 'request-element-table-sup',
	templateUrl: './request-element-table.component.html',
	styleUrls: ['./request-element-table.component.scss']
})
export class RequestElementTableComponent extends EntityTableComponent<RequestElement> implements OnInit {

	@Input() creationDate: string;
	private _rows: Array<RequestElement>;
	@Input() set rows(rows: Array<RequestElement>) {
		this._rows = rows;
		if (rows) {
			this.replied = rows.map(row => (
				{
					replied: row.reply.fields.filter(field => field.value).length,
					total: row.reply.fields.length
				}
			));
		}
	}
	get rows() {
		return this._rows;
	}
	@Output() openRefuseReplyDlg = new EventEmitter<ID>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;
	replied: { replied: number, total: number }[];
	erm = ERM;

	constructor() { super(); }

	ngOnInit() {
	}

}
