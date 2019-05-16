import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ERM, SupplierRequest } from '~core/models';
import { ID } from '~utils';

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

	@Output() cancelRequest = new EventEmitter<SupplierRequest>();
	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;
	erm = ERM;

	constructor() { super(); }

}
