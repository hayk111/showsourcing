import { uuid } from '~utils';
import { Attachment } from '~core/erm/models/attachment.model';


export class AttachmentUploadRequest {
	id ?= uuid();
	status ?= 'request';
	attachment?: Attachment;
	__typename ?= 'AttachmentUploadRequest';

	constructor(config: Attachment) {
		this.attachment = new Attachment(config);
	}

}

export interface AttachmentUploadRequestConfig {

}
