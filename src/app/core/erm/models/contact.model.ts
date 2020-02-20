import { Entity } from '~core/erm/models/_entity.model';
import { AppImage } from '~core/erm/models/app-image.model';
import { Supplier } from '~core/erm/models/supplier.model';

export class Contact extends Entity<Contact> {
	name?: string;
	phoneNumber?: string;
	email?: string;
	businessCardImage?: AppImage;
	jobTitle?: string;
	supplier?: Supplier;
	company?: string;
	deleted?: boolean;
	__typename ?= 'Contact';

	constructor(config: Contact) {
		super(config);
		if (config && config.email && !config.name)
			this.name = config.email.split('@')[0].split(new RegExp('[-._]')).join(' ');
		this.deleted = false;
	}
}
