import { EntityWithAudit } from './_entity.model';

export class Attachment extends EntityWithAudit<AttachmentConfig> {
	fileName: string;
	url: string;
	size?: number;
	pending?: boolean;
	__typename ?= 'Attachment';

	constructor(config: AttachmentConfig) {
		super(config);
	}
}


export interface AttachmentConfig {
	id?: string;
	fileName?: string;
	size?: number;
}
