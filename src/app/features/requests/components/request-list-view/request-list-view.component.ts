import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ERM, SupplierRequest } from '~core/models';

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
	erm = ERM;

	constructor() { super(); }

}
