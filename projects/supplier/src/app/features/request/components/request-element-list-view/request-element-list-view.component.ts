import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { RequestElement } from '~core/models';

@Component({
	selector: 'request-element-list-view-sup',
	templateUrl: './request-element-list-view.component.html',
	styleUrls: [
		'./request-element-list-view.component.scss',
		'../../../../../../../../src/app/theming/specific/list.scss'
	]
})
export class RequestElementListViewComponent extends ListViewComponent<RequestElement> implements OnInit {

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

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;
	replied: { replied: number, total: number }[];

	constructor() { super(); }

	ngOnInit() {
	}

}
