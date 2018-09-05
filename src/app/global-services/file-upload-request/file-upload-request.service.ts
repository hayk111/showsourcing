import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { FileUploadRequest } from '~models';
import { Apollo } from 'apollo-angular';
import { FileUploadRequestQueries } from '~global-services/file-upload-request/file-upload-request.queries';
import { ApolloStateService } from '~shared/apollo';


@Injectable({ providedIn: 'root' })
export class FileUploadRequestService extends GlobalService<FileUploadRequest> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, FileUploadRequestQueries, 'fileUploadRequest', 'fileUploadRequests');
	}
}
