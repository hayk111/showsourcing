import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { FileUploadRequest } from '~models';
import { ApolloClient } from '~shared/apollo';
import { FileUploadQueries } from '~global-services/file-upload-request/file-upload.queries';


@Injectable({ providedIn: 'root' })
export class FileUploadService extends GlobalService<FileUploadRequest> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new FileUploadQueries());
	}
}
