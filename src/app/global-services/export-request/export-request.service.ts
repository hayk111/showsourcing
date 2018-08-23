import { Injectable } from '@angular/core';
import { ExportRequest } from '~models';

import { GlobalService } from '~global-services/_global/global.service';
import { ExportRequestQueries } from '~global-services/export-request/export-request.queries';
import { of } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';


@Injectable({
	providedIn: 'root'
})
export class ExportRequestService extends GlobalService<ExportRequest> {

	constructor(protected apollo: Apollo) {
		super(apollo, ExportRequestQueries, 'exportRequest', 'exportRequests');
	}

	create(request: ExportRequest, ...args) {
		return super.create(request, ...args).pipe(
			switchMap(_ => this.waitForOne(`id == "${request.id}" AND status == "active"`))
		);
	}

}

