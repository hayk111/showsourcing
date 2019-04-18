import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ERM, SupplierRequest, RequestElement } from '~core/models';

@Component({
	selector: 'request-list-view-app',
	templateUrl: './request-list-view.component.html',
	styleUrls: [
		'./request-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestListViewComponent extends ListViewComponent<SupplierRequest> {

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;
	@Output() refuse = new EventEmitter<SupplierRequest>();
	erm = ERM;


	constructor() { super(); }

}
