import { ID, uuid } from '~utils';
import { Contact } from './contact.model';
import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { RequestElement } from './request-element.model';

export class GlobalRequest {
	id: ID;
	requestElements: RequestElement[];
	sender: Contact;
	senderTeamId: string;
	title: string;
	message?: string;
	recipient: Contact;
	sendCopyTo: string[];
	status: string;
	images: AppImage[];
	attachments: Attachment[];
	creationDate: string;
	lastUpdatedDate: string;
	__typename?= 'Request';

	constructor(config: GlobalRequestConfig) {
		if (!config.id) this.id = uuid();
		this.creationDate = '' + new Date();
		this.lastUpdatedDate = '' + new Date();
		Object.assign(this, config);
	}
}

export interface GlobalRequestConfig {
	id?: ID;
	message?: string;
	requestElements?: RequestElement[];
	senderTeamId?: string;
	title?: string;
	status?: string;
}
