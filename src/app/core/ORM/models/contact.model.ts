import { EntityWithAudit } from '~core/ORM/models/_entity.model';
import { AppImage } from '~core/ORM/models/app-image.model';
import { Supplier } from '~core/ORM/models/supplier.model';

export class Contact extends EntityWithAudit<ContactConfig> {
	name: string;
	phoneNumber?: string;
	email?: string;
	businessCardImage?: AppImage;
	jobTitle?: string;
	supplier?: Supplier;
	company?: string;
	deleted?: boolean;
	__typename ?= 'Contact';

	constructor(config: ContactConfig) {
		super(config);
		if (config && config.email && !config.name)
			this.name = config.email.split('@')[0].split(new RegExp('[-._]')).join(' ');
		this.deleted = false;
	}
}

export interface ContactConfig {
	name?: string;
	phoneNumber?: string;
	email?: string;
	businessCardImage?: AppImage;
	jobTitle?: string;
	supplier?: Supplier;
	company?: string;
}
