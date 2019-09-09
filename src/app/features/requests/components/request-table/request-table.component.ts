import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { EntityTableComponent } from '~core/list-page';
import { ERM, SupplierRequest } from '~core/models';

@Component({
	selector: 'request-table-app',
	templateUrl: './request-table.component.html',
	styleUrls: [
		'./request-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestTableComponent extends EntityTableComponent<SupplierRequest> {

	@Output() cancelRequest = new EventEmitter<SupplierRequest>();
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;
	erm = ERM;

	constructor() { super(); }

}
