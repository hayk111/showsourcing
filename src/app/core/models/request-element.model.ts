import { ID, uuid } from '~utils';

import { AppImage } from './app-image.model';
import { Attachment } from './attachment.model';
import { RequestReply } from './request-reply.model';

export class RequestElement {
	id: ID;
	name: string;
	targetedEntityType: string;
	targetId: string;
	reply?: RequestReply;
	images: AppImage[];
	attachments: Attachment[];
	__typename?= 'RequestElement';

	constructor(config: RequestElementConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface RequestElementConfig {
	id?: ID;
	name?: string;
	targetedEntityType?: string;
}
