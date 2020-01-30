import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import {
	AttachmentUploadRequestQueries,
} from '~entity-services/attachment-upload-request/attachment-upload-request.queries';
import { AttachmentUploadRequest } from '~models';


@Injectable({ providedIn: 'root' })
export class AttachmentUploadRequestService extends GlobalService<AttachmentUploadRequest> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, AttachmentUploadRequestQueries, 'attachmentUploadRequest', 'attachmentUploadRequests');
	}
}
