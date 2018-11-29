import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExportRequest, User } from '~models';

import { GlobalService } from '~global-services/_global/global.service';
import { ExportRequestQueries } from '~global-services/export-request/export-request.queries';
import { of } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { switchMap, tap, map, filter, take } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { UserService, TeamUserService } from '~global-services';


@Injectable({
	providedIn: 'root'
})
export class ExportRequestService extends GlobalService<ExportRequest> {

	constructor(
		protected apolloState: ApolloStateService,
		private userSrv: UserService,
		private teamUserSrv: TeamUserService,
		private http: HttpClient
		) {
		super(apolloState, ExportRequestQueries, 'exportRequest', 'exportRequests');
	}

	create(request: ExportRequest, ...args) {
		return this.userSrv.selectUser().pipe(
			take(1),
			tap(user => request.createdBy = { id: user.id }),
			switchMap(() => super.create(request, ...args)),
			switchMap(_ => this.waitForOne(`id == "${request.id}" AND status == "ready"`))
		);
	}

	retrieveFile(request: ExportRequest) {
		return this.http.get(request.documentUrl, { responseType: 'blob' });
	}
}

