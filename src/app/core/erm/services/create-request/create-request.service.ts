import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '../_global/global-with-audit.service';
import { UserService } from '../user/user.service';
import { CreateRequestQueries } from './create-request.queries';
import { CreateRequest } from '~core/erm/models';



@Injectable({ providedIn: 'root' })
export class CreateRequestService extends GlobalWithAuditService<CreateRequest> {
	constructor(
		protected userSrv: UserService
	) {
		super(CreateRequestQueries, 'createRequest', 'createRequests', userSrv);
	}

}
