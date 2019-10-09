import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { UserService } from '~entity-services';
import { GlobalService } from '~entity-services/_global/global.service';
import { ExportRequestQueries } from '~entity-services/export-request/export-request.queries';
import { ExportRequest } from '~models';
import { NotificationService, NotificationType } from '~shared/notifications';


@Injectable({
	providedIn: 'root'
})
export class ExportRequestService extends GlobalService<ExportRequest> {

	constructor(
		protected apolloState: ApolloStateService,
		private userSrv: UserService,
		private notifSrv: NotificationService,
		private http: HttpClient,
		private datePipe: DatePipe
	) {
		super(apolloState, ExportRequestQueries, 'exportRequest', 'exportRequests');
	}

	async addNotif(type: NotificationType, exportReq: ExportRequest) {
		this.notifSrv.add({
			type,
			title: 'Exporting file',
			message: type === NotificationType.SUCCESS ?
				'Export successfully completed' : 'Failed exporting files',
			actionMessage: 'Click here to download the file',
			timeout: 6500,
			action: this.retrieveFile(exportReq)
		});
	}


	create(request: ExportRequest) {
		return this.userSrv.selectUser().pipe(
			take(1),
			tap(user => request.createdBy = { id: user.id }),
			switchMap(() => super.create(request)),
			switchMap(_ => this.waitForOne(`id == "${request.id}" AND (status == "ready" OR status == "rejected" OR status == "pending")`))
		);
	}

	private transformDate(date) {
		return this.datePipe.transform(date, 'yyy-MM-ddThh:mm:ss');
	}

	retrieveFile(request: ExportRequest): Observable<{ file: any, name: string }> {
		const extension = request.documentUrl.split('.').pop();
		const name = request.format + '_' + this.transformDate(request.creationDate) + '.' + extension;
		return this.http.get(request.documentUrl, { responseType: 'blob', observe: 'response' }).pipe(
			map(res => ({ file: res.body, name }))
		);
	}

	isExportReady(exportReq: ExportRequest) {
		return this.waitForOne(`id == "${exportReq.id}" AND (status == "ready" OR status == "rejected")`).pipe(
			tap(latestExport => {
				if (latestExport.status === 'rejected') {
					this.addNotif(NotificationType.ERROR, latestExport);
					throw Error('Abort');
				} else
					this.addNotif(NotificationType.SUCCESS, latestExport);
			}),
		);
	}

}
