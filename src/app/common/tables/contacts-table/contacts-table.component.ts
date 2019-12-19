import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Contact } from '~core/models';
import { config } from './config';
import { EntityTableComponent } from '../entity-table.component';



@Component({
	selector: 'contacts-table-app',
	templateUrl: './contacts-table.component.html',
	styleUrls: ['./contacts-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsTableComponent extends EntityTableComponent<Contact> {
	static DEFAULT_COLUMNS = [
		'logo',
		'name',
		'email',
		'jobTitle',
		'phoneNumber',
		'createdBy',
		'creationDate'
	];
	static DEFAULT_TABLE_CONFIG = config;
	@Input() columns = ContactsTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = ContactsTableComponent.DEFAULT_TABLE_CONFIG;
	@Input() navigation = true;
	@Output() openCreateRequestDlg = new EventEmitter<undefined>();

	constructor(public translate: TranslateService) {
		super();
	}

	onClose(isCancel: boolean, contact: Contact) {
		if (!isCancel)
			this.update.emit(contact);
	}
}
