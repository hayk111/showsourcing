import { Injectable } from '@angular/core';
import { ExportRequest } from '~models';
import { ApolloWrapper } from '~shared/apollo';

import { GlobalService } from '~global-services/_global/global.service';
import { ExportRequestQueries } from '~global-services/export-request/export-request.queries';
import { of } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { switchMap, tap, map, filter } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class ExportRequestService extends GlobalService<ExportRequest> {

	constructor(protected apollo: Apollo) {
		super(apollo, new ExportRequestQueries(), 'ExportRequest');
	}

	create(request: ExportRequest) {
		return super.create(request).pipe(
			switchMap(_ => this.waitForOne(`id == "${request.id}" AND status == "active"`))
		);
	}

}

