import { uuid } from '~utils';

export class Attachment {
	id: string;
	fileName: string;
	url: string;
	size?: number;
	pending?: boolean;
	__typename ?= 'Attachment';

	constructor(config: AttachmentConfig) {
		this.id = uuid();
		Object.assign(this, config);
	}
}


export interface AttachmentConfig {
	id?: string;
	fileName?: string;
	size?: number;
}
