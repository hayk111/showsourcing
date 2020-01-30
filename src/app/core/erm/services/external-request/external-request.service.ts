import { Injectable } from '@angular/core';
import { ExternalRequest } from '~core/erm/models';
import { ExternalRequestQueries } from '~core/erm/services/external-request/external-request.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';

@Injectable({ providedIn: 'root' })
export class ExternalRequestService extends GlobalWithAuditService<ExternalRequest> {

	constructor(protected userSrv: UserService) {
		super(ExternalRequestQueries, 'externalRequest', 'externalRequests', userSrv);
	}
}

