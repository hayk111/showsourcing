import { ID, RequestStatus } from '~utils';
import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { Contact } from './contact.model';
import { RequestElement } from './request-element.model';
import { Entity } from './_entity.model';



export class SupplierRequest extends Entity<SupplierRequest> {
	id: ID;
	requestElements: RequestElement[];
	sender: Contact;
	senderTeamId: string;
	templateName?: string;
	title: string;
	message?: string;
	recipient: Contact;
	status: RequestStatus;
	images: AppImage[];
	attachments: Attachment[];
	creationDate: string;
	lastUpdatedDate: string;
	sentDate: string;
	__typename ?= 'Request';
}
