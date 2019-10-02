import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { ERM, SupplierRequest } from '~core/models';
import { TranslateService } from '@ngx-translate/core';

const tableConfig: TableConfig = {
	title: { name: 'title', translationKey: 'title', width: 300, sortProperty: 'title' },
	type: { name: 'type', translationKey: 'type', width: 175, sortProperty: 'templateName' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 220, sortProperty: 'recipient.company' },
	sentTo: { name: 'sent to', translationKey: 'sent-to', width: 175, sortProperty: 'recipient.name' },
	requests: { name: 'number requests', translationKey: '#-requests', width: 90, sortable: false },
	status: { name: 'status', translationKey: 'status', width: 175, sortProperty: 'status' },
	sentOn: { name: 'sent on', translationKey: 'sent-on', width: 175, sortProperty: 'sentDate' },
	sender: { name: 'sender', translationKey: 'sender', width: 175, sortProperty: 'sender.name' },
};

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
	columns = ['title', 'type', 'supplier', 'sentTo', 'requests', 'status', 'sentOn', 'sender'];
	@Output() cancelRequest = new EventEmitter<SupplierRequest>();
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;
	tableConfig = tableConfig;
	erm = ERM;

	constructor(public translate: TranslateService) { super(); }

}
