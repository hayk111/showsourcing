import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { User } from '~models';
import { RequestQueries } from '~features/products/services/request.queries';
import { forkJoin, from } from 'rxjs';
import { take, map, filter, first, switchMap } from 'rxjs/operators';
import { GqlClient } from '~shared/apollo';
import { uuid } from '~utils';

// TODO: thiery same comment as in features/product/services/team.service
@Injectable()
export class ExportService {

	constructor(private gqlClient: GqlClient) { }

	/*
        Add products export.
     */
	addProductsExport(productIds: string[], exportType: string): Observable<any> {
		const exportRequest = {
			id: uuid(),
			status: 'pending',
			type: exportType
		};
		return this.addExportRequest(exportRequest).pipe(
			switchMap(addedExportRequest => this.updateExportRequest({
				...addedExportRequest,
				targetProducts: productIds.map(productId => ({ id: productId })),
			}))
		);
	}

	/*
        Add export request.
     */
	addExportRequest(exportRequest) {
		return this.gqlClient.update({ gql: RequestQueries.addExportRequest, input: exportRequest, typename: 'exportRequest' })
			.pipe(
				first(),
				map((r: any) => r.data.addexportRequest)
			);
	}

	/*
        Update export request.
     */
	updateExportRequest(exportRequest) {
		return this.gqlClient.update({ gql: RequestQueries.updateExportRequest, input: exportRequest, typename: 'exportRequest' })
			.pipe(first());
	}
}
