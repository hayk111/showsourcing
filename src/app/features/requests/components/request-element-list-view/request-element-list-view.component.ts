import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	TemplateRef,
	ViewChild,
	AfterViewChecked,
	OnInit,
} from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ExtendedField, RequestElement, ExtendedFieldDefinition } from '~core/models';

@Component({
	selector: 'request-element-list-view-app',
	templateUrl: './request-element-list-view.component.html',
	styleUrls: [
		'./request-element-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementListViewComponent extends ListViewComponent<RequestElement> implements OnInit {

	@Input() extendedFields: ExtendedFieldDefinition[];
	private _rows: Array<RequestElement>;
	@Input() set rows(rows: Array<RequestElement>) {
		this._rows = rows;
	}
	get rows() {
		return this._rows;
	}
	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;
	extendedFields2: ExtendedFieldDefinition[];

	constructor(private cdr: ChangeDetectorRef) { super(); }

	ngOnInit() {
		console.log(this.rows);
	}

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
