import { ID, uuid } from '~utils';
import { Contact } from './contact.model';
import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { RequestElement } from './request-element.model';

export class Request {
	id: ID;
	name: string;
	requestElements?: RequestElement;
	message?: string;
	recipient?: Contact;
	sendCopyTo: string[];
	sender?: Contact;
	status: string;
	images: AppImage[];
	attachments: Attachment[];
	creationDate: string;
	lastUpdatedDate: string;
	__typename?= 'Request';

	constructor(config: RequestConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface RequestConfig {
	id?: ID;
	name?: string;
}
