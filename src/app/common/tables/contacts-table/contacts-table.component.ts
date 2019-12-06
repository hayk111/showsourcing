import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { Contact } from '~core/models';
import { Color } from '~utils';

import { defaultConfig } from '../default-columns/default-config';

const tableConfig: TableConfig = {
	...defaultConfig,
	name: { name: 'name', translationKey: 'name', width: 310, sortable: true, sortProperty: 'name' },
	email: { name: 'email', translationKey: 'email', width: 250, sortable: true, sortProperty: 'email' },
	jobTitle: { name: 'jobTitle', translationKey: 'function', width: 190, sortable: true, sortProperty: 'jobTitle' },
	phoneNumber: { name: 'phoneNumber', translationKey: 'phone', width: 170, sortable: true, sortProperty: 'phoneNumber' },
};

@Component({
	selector: 'contacts-table-app',
	templateUrl: './contacts-table.component.html',
	styleUrls: ['./contacts-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsTableComponent extends EntityTableComponent<Contact> {
	@Input() navigation = true;
	@Output() openCreateRequestDlg = new EventEmitter<undefined>();

	columns = [
		'logo',
		'name',
		'email',
		'jobTitle',
		'phoneNumber',
		'createdBy',
		'creationDate'
	];
	tableConfig = tableConfig;
	color = Color;

	constructor(public translate: TranslateService) {
		super();
	}

	onClose(isCancel: boolean, contact: Contact) {
		if (!isCancel)
			this.update.emit(contact);;
	}
}
