import { Injectable } from '@angular/core';
import { ExportRequest } from '~models';
import { ApolloWrapper } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ExportRequestQueries } from './export-request.queries';
import { of } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { switchMap } from '../../../../node_modules/rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class ExportRequestService extends GlobalService<ExportRequest> {

	constructor(protected apollo: ApolloWrapper) {
		super(apollo, new ExportRequestQueries(), 'ExportRequest');
	}

	create(request: ExportRequest) {
		return super.create(request).pipe(
			switchMap(_ => this.waitForRequestValid(request))
		);
	}

	private waitForRequestValid(request: ExportRequest) {
		return this.selectMany(
			of(
				new SelectParams({ query: `id == "${request.id}" AND status == "active"` })
			)
		);
	}

}

