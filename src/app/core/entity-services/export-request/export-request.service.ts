import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { TeamUserService, UserService } from '~entity-services';
import { GlobalService } from '~entity-services/_global/global.service';
import { ExportRequestQueries } from '~entity-services/export-request/export-request.queries';
import { ExportRequest } from '~models';


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
			switchMap(_ => this.waitForOne(`id == "${request.id}" AND (status == "ready" OR status == "rejected")`))
		);
	}

	retrieveFile(request: ExportRequest): Observable<{ file: any, name: string }> {
		return this.http.get(request.documentUrl, { responseType: 'blob', observe: 'response' }).pipe(
			map(res => ({ file: res.body, name: request.documentUrl.split('/').pop() }))
		);
	}
}

