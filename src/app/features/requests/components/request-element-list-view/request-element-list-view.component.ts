import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ExtendedFieldDefinition, RequestElement } from '~core/models';

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
		if (rows && rows.length && rows[0].reply && rows[0].reply.fields
			&& rows[0].reply.fields.length)
			this.extendedFields = (rows[0].reply.fields).map(field => field.definition);
	}
	get rows() {
		return this._rows;
	}

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;
	extendedFields: ExtendedFieldDefinition[];

	constructor(private cdr: ChangeDetectorRef) { super(); }

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
