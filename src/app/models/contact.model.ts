import { BaseEntity } from './_entity.model';
import { AppImage } from './app-image.model';
import { Supplier } from './supplier.model';

export class Contact extends BaseEntity<ContactConfig> {
	name?: string;
	phoneNumber?: string;
	email?: string;
	businessCardImage?: AppImage;
	jobTitle?: string;
	supplier?: Supplier;
	deleted?: boolean;

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
