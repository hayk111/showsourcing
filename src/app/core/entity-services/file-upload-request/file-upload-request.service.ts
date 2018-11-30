import { Injectable } from '@angular/core';
import { GlobalService } from '~entity-services/_global/global.service';
import { FileUploadRequest } from '~models';
import { Apollo } from 'apollo-angular';
import { FileUploadRequestQueries } from '~entity-services/file-upload-request/file-upload-request.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({ providedIn: 'root' })
export class FileUploadRequestService extends GlobalService<FileUploadRequest> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, FileUploadRequestQueries, 'fileUploadRequest', 'fileUploadRequests');
	}
}
