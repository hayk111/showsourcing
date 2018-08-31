import { Injectable } from '@angular/core';
import { ERMService } from '~global-services/_global/erm.service';
import { EntityMetadata, ProductStatusType, SupplierStatusType, ERM } from '~models';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WorkflowActionService {

	private productStatusTypes$: Observable<ProductStatusType[]> = this.ermSrv.getStatusService(ERM.PRODUCT)
		.queryAll('id, name, category, step, inWorkflow').pipe(
			shareReplay(1)
		);
	supplierStatusTypes$: Observable<SupplierStatusType[]> = this.ermSrv.getStatusService(ERM.SUPPLIER)
		.queryAll('id, name, category, step, inWorkflow').pipe(
			shareReplay(1)
		);

	constructor(
		private ermSrv: ERMService
	) {

	}

	getTableStatus(typeEntity: EntityMetadata): Observable<SupplierStatusType[] | ProductStatusType[]> {
		// switch (typeEntity) {
		// 	case ERM.PRODUCT: return this.productStatusTypes$;
		// 	case ERM.SUPPLIER: return this.supplierStatusTypes$;
		// }
		return of(null);
	}

	updateStatus(entity, typeEntity: EntityMetadata) {
		return this.ermSrv.getGlobalService(typeEntity).update(entity);
	}
}
