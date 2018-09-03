import { EntityWithAudit } from '~models/_entity.model';
import { AppImage } from '~models/app-image.model';
import { Supplier } from '~models/supplier.model';

export class Contact extends EntityWithAudit<ContactConfig> {
	name: string;
	phoneNumber?: string;
	email?: string;
	businessCardImage?: AppImage;
	jobTitle?: string;
	supplier?: Supplier;
	deleted?: boolean;
	__typename ?= 'Contact';

	constructor(config: ContactConfig, supplierId: string) {
		super(config);
		this.supplier = { id: supplierId };
		this.deleted = false;
	}
}

export interface ContactConfig {
	name: string;
	phoneNumber?: string;
	email?: string;
	businessCardImage?: AppImage;
	jobTitle?: string;
	supplier: Supplier;
}
