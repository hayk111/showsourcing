import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { FileUploadRequest } from '~models';
import { ApolloWrapper } from '~shared/apollo';
import { FileUploadRequestQueries } from '~global-services/file-upload-request/file-upload-request.queries';


@Injectable({ providedIn: 'root' })
export class FileUploadRequestService extends GlobalService<FileUploadRequest> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new FileUploadRequestQueries());
	}
}
