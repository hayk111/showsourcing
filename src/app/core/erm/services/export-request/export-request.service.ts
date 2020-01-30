import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ExportRequest } from '~core/erm/models';
import { ExportRequestQueries } from '~core/erm/services/export-request/export-request.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { ToastService, ToastType } from '~shared/toast';


@Injectable({
	providedIn: 'root'
})
export class ExportRequestService extends GlobalService<ExportRequest> {

	constructor(
		private userSrv: UserService,
		private toastSrv: ToastService,
		private http: HttpClient,
		private datePipe: DatePipe
	) {
		super(ExportRequestQueries, 'exportRequest', 'exportRequests');
	}

	async addNotif(type: ToastType, exportReq: ExportRequest) {
		this.toastSrv.add({
			type,
			title: 'title.exporting-file',
			message: type === ToastType.SUCCESS ?
				'message.export-successfully-completed' : 'message.failed-exporting-file',
			actionMessage: 'message.click-download-file',
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
					this.addNotif(ToastType.ERROR, latestExport);
					throw Error('Abort');
				} else
					this.addNotif(ToastType.SUCCESS, latestExport);
			}),
		);
	}

}
