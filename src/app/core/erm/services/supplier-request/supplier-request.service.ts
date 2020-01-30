import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierRequest } from '~core/erm/models';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { SupplierRequestQueries } from './supplier-request.queries';

@Injectable({ providedIn: 'root' })
export class SupplierRequestService extends GlobalService<SupplierRequest> {


	constructor() {
		super(SupplierRequestQueries, 'request', 'requests');
	}

	/** @inheritDoc
	 * Updates on entity with an audit will add properties needed by the backend
	 */
	update(entity: any, fields?: string, isOptimistic: boolean = true): Observable<SupplierRequest> {
		throw Error('not implemented yet');
		// entity.lastUpdatedDate = '' + new Date();
		// return super.update(entity, client, fields, isOptimistic);
	}

}
