import { uuid } from '~utils';
import { Attachment, AttachmentConfig } from '~models/attachment.model';


export class AttachmentUploadRequest {
	id ?= uuid();
	status ?= 'request';
	attachment?: Attachment;
	__typename ?= 'AttachmentUploadRequest';

	constructor(config: AttachmentConfig) {
		this.attachment = new Attachment(config);
	}

}

export interface AttachmentUploadRequestConfig {

}
