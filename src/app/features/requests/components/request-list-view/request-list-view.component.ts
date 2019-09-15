import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ERM, SupplierRequest } from '~core/models';

@Component({
	selector: 'request-list-view-app',
	templateUrl: './request-list-view.component.html',
	styleUrls: [
		'./request-list-view.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestListViewComponent extends ListViewComponent<SupplierRequest> {

	@Output() cancelRequest = new EventEmitter<SupplierRequest>();
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;
	erm = ERM;

	constructor() { super(); }

}
