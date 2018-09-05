import { uuid } from '~utils';
import { Attachment } from '~models/attachment.model';


export class FileUploadRequest {
	id ?= uuid();
	status ?= 'request';
	attachment?: any;
	__typename ?= 'FileUploadRequest';

	constructor(fileName: string) {
		this.attachment = new Attachment(fileName);
	}

}

export interface FileUploadRequestConfig {

}
