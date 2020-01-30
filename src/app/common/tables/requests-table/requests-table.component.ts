import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { SupplierRequest } from '~core/erm';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '../entity-table.component';

const tableConfig: TableConfig = {
	title: { name: 'title', translationKey: 'title', width: 300, sortProperty: 'title' },
	type: { name: 'type', translationKey: 'type', width: 175, sortProperty: 'templateName' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 220, sortProperty: 'recipient.company' },
	sentTo: { name: 'sentTo', translationKey: 'sent-to', width: 175, sortProperty: 'recipient.name' },
	requests: { name: 'number requests', translationKey: 'requests', width: 90, sortable: false },
	status: { name: 'status', translationKey: 'status', width: 175, sortProperty: 'status' },
	sentOn: { name: 'sentOn', translationKey: 'sent-on', width: 175, sortProperty: 'sentDate' },
	sender: { name: 'sender', translationKey: 'sent-by', width: 175, sortProperty: 'sender.name' },
};

@Component({
	selector: 'requests-table-app',
	templateUrl: './requests-table.component.html',
	styleUrls: [
		'./requests-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsTableComponent extends EntityTableComponent<SupplierRequest> {
	static DEFAULT_COLUMNS = ['title', 'type', 'supplier', 'sentTo', 'requests', 'status', 'sentOn', 'sender'];
	static DEFAULT_TABLE_CONFIG = tableConfig;
	@Input() columns = RequestsTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = RequestsTableComponent.DEFAULT_TABLE_CONFIG;

	@Output() cancelRequest = new EventEmitter<SupplierRequest>();
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	constructor(public translate: TranslateService) { super(); }

}
