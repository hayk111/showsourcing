import { Injectable } from '@angular/core';
import { AttachmentUploadRequest } from '~core/erm/models';
import { AttachmentUploadRequestQueries } from '~core/erm/services/attachment-upload-request/attachment-upload-request.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';


@Injectable({ providedIn: 'root' })
export class AttachmentUploadRequestService extends GlobalService<AttachmentUploadRequest> {

	constructor() {
		super(AttachmentUploadRequestQueries, 'attachmentUploadRequest', 'attachmentUploadRequests');
	}
}
