import { uuid } from '~utils';
import { AppFile } from '~models/app-file.model';


export class FileUploadRequest {
	id?= uuid();
	status?= 'request';
	file?: any;

	constructor(extension: string) {
		this.file = new AppFile(extension);
	}

}

export interface FileUploadRequestConfig {

}
