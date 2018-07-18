import { Injectable } from '@angular/core';
import { ExportRequest } from '~models';
import { ApolloWrapper } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ExportRequestQueries } from './export-request.queries';


@Injectable({
	providedIn: 'root'
})
export class ExportRequestService extends GlobalService<ExportRequest> {

	constructor(protected apollo: ApolloWrapper) {
		super(apollo, new ExportRequestQueries(), 'ExportRequest');
	}

}

