import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { RequestElement, ExtendedField } from '~core/models';

@Component({
	selector: 'request-element-list-view-sup',
	templateUrl: './request-element-list-view.component.html',
	styleUrls: [
		'./request-element-list-view.component.scss',
		'../../../../../../../../src/app/theming/specific/list.scss'
	]
})
export class RequestElementListViewComponent extends ListViewComponent<RequestElement> implements OnInit {

	private _rows: Array<RequestElement>;
	@Input() set rows(rows: Array<RequestElement>) {
		this._rows = rows;
		const firstRow = (rows || [])[0];
		const reply = firstRow ? firstRow.reply : undefined;
		this.fields = reply ? reply.fields : [];
	}
	get rows() {
		return this._rows;
	}

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;
	fields: ExtendedField[];

	constructor() { super(); }

	ngOnInit() {
	}

}
