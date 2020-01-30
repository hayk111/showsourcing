import { Injectable } from '@angular/core';
import { AttachmentQueries } from '~core/erm/services/attachment/attachment.queries';
import { Attachment } from '~core/erm/models';
import { GlobalWithAuditService } from '../_global/global-with-audit.service';
import { UserService } from '../user/user.service';



@Injectable({
	providedIn: 'root'
})
export class AttachmentService extends GlobalWithAuditService<Attachment> {

	constructor(protected userSrv: UserService) {
		super(AttachmentQueries, 'attachment', 'attachments', userSrv);
	}

	download(file: Attachment) {
		if (window) {
			window.open(file.url);
		}
	}
}
