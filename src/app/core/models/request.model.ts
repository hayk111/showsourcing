import { ID } from '~utils';
import { Contact } from './contact.model';
import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { RequestElement } from './request-element.model';
import { EntityWithAudit } from './_entity.model';
import { Product } from './product.model';
import { Supplier } from './supplier.model';

export class Request extends EntityWithAudit<RequestConfig> {
	id: ID;
	products: Product[];
	suppliers: Supplier[];
	// requestTtemplate?: RequestTemplate;
	requestElements: RequestElement[];
	shareInformation: boolean;
	title: string;
	message?: string;
	recipient: Contact;
	sendCopyTo: string[];
	status: string;
	images: AppImage[];
	attachments: Attachment[];
	__typename?= 'Request';

	constructor(config: RequestConfig) {
		super(config);
	}
}

export interface RequestConfig {
	message?: string;
	requestElements?: RequestElement[];
	title?: string;
	status?: string;
	shareInformation?: boolean;
}
