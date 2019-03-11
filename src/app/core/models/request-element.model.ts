import { ID, uuid } from '~utils';

import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { RequestFieldDefinition } from './request-field-definition.model';
import { RequestReply } from './request-reply.model';

export class RequestElement {
	id: ID;
	name: string;
	targetedEntity: string;
	reply?: RequestReply;
	images: AppImage[];
	attachments: Attachment[];
	requestedFields: RequestFieldDefinition[];
	__typename?= 'RequestElement';

	constructor(config: RequestElementConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface RequestElementConfig {
	id?: ID;
	name?: string;
	targetedEntity?; string;
}
