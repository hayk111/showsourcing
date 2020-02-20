import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { Contact } from './contact.model';
import { Product } from './product.model';
import { RequestTemplate } from './request-template.model';
import { Entity } from './_entity.model';



export class CreateRequest extends Entity<CreateRequest> {
	products?: Product[];
	requestTemplate?: RequestTemplate;
	shareInformation?: boolean;
	title?: string;
	message?: string;
	recipient?: Contact;
	sendCopyTo?: string[];
	images?: AppImage[];
	attachments?: Attachment[];
	__typename ?= 'CreateRequest';
}
