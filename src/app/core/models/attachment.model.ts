import { uuid } from '~utils';

export class Attachment {
	id: string;
	fileName: string;
	url: string;
	size?: number;
	pending?: boolean;
	__typename?= 'Attachment';

	constructor(config: AttachmentConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}


export interface AttachmentConfig {
	id?: string;
	fileName?: string;
	size?: number;
}
