import { ID } from '~utils';

import { EntityWithAudit } from './_entity.model';
import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { Contact } from './contact.model';
import { Product } from './product.model';
import { RequestTemplate } from './request-template.model';


export class CreateRequest extends EntityWithAudit<RequestConfig> {
	id: ID;
	products: Product[];
	requestTemplate?: RequestTemplate;
	shareInformation: boolean;
	title: string;
	message?: string;
	recipient: Contact;
	sendCopyTo: string[];
	images: AppImage[];
	attachments: Attachment[];
	__typename?= 'CreateRequest';

	constructor(config: RequestConfig) {
		super(config);
	}
}

export interface RequestConfig {
	products?: Product[];
	requestTemplate?: RequestTemplate;
	shareInformation?: boolean;
	title?: string;
	message?: string;
	recipient?: Contact;
	sendCopyTo?: string[];
	images?: AppImage[];
	attachments?: Attachment[];
}
