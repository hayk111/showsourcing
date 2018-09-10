import { Injectable } from '@angular/core';
import { ERMService } from '~global-services/_global/erm.service';
import { EntityMetadata, ProductStatusType, SupplierStatusType, ERM } from '~models';
import { Observable, of } from 'rxjs';
import { shareReplay, share } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WorkflowActionService {

	private productStatusTypes$: Observable<ProductStatusType[]> = this.ermSrv.getStatusService(ERM.PRODUCT)
		.getListQuery({ sortBy: 'step' }, 'name, category, step, inWorkflow').items$.pipe(
			shareReplay(1)
		);
	supplierStatusTypes$: Observable<SupplierStatusType[]> = this.ermSrv.getStatusService(ERM.SUPPLIER)
		.getListQuery({ sortBy: 'step' }, 'name, category, step, inWorkflow').items$.pipe(
			shareReplay(1)
		);

	constructor(
		private ermSrv: ERMService
	) {

	}

	getTableStatus(typeEntity: EntityMetadata): Observable<SupplierStatusType[] | ProductStatusType[]> {
		switch (typeEntity) {
			case ERM.PRODUCT: return this.productStatusTypes$;
			case ERM.SUPPLIER: return this.supplierStatusTypes$;
		}
		// return this.ermSrv.getStatusService(typeEntity).queryAll('id, name, category, step, inWorkflow');

	}

	updateStatus(entity, typeEntity: EntityMetadata) {
		return this.ermSrv.getGlobalService(typeEntity).update(entity);
	}
}
