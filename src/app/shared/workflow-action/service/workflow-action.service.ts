import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ERMService } from '~global-services/_global/erm.service';
import { EntityMetadata, ERM, ProductStatusType, SupplierStatusType } from '~models';

@Injectable({
	providedIn: 'root'
})
export class WorkflowActionService {

	// if we dont want to see all at once and use a scroll for this, instead of query all
	// we need queryList, so we can refetch. And the workflow.html need infiniteScroll
	productStatusTypes$: Observable<ProductStatusType[]> = this.ermSrv.getStatusService(ERM.PRODUCT)
		.queryAll('name, category, step, inWorkflow', { sortBy: 'step' }).pipe(
			shareReplay(1)
		);
	supplierStatusTypes$: Observable<SupplierStatusType[]> = this.ermSrv.getStatusService(ERM.SUPPLIER)
		.queryAll('name, category, step, inWorkflow', { sortBy: 'step' }).pipe(
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
