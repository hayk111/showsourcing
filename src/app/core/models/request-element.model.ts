import { ID, uuid } from '~utils';

import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { ExtendedFieldDefinition } from './extended-field-definition.model';
import { RequestReply } from './request-reply.model';

export class RequestElement {
	id: ID;
	name: string;
	targetedEntityType: string;
	reply?: RequestReply;
	images: AppImage[];
	attachments: Attachment[];
	__typename?= 'RequestElement';

	constructor(config: RequestElementConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface RequestElementConfig {
	id?: ID;
	name?: string;
	targetedEntityType?: string;
}
