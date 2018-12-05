import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { TaskService } from '~core/entity-services';
import { ERMService } from '~entity-services/_global/erm.service';
import { EntityMetadata, ERM, SampleStatus, SupplierStatus, ProductStatus } from '~models';

@Injectable({
	providedIn: 'root'
})
export class StatusSelectorService {

	// if we dont want to see all at once and use a scroll for this, instead of query all
	// we need queryList, so we can refetch. And the workflow.html need infiniteScroll
	productStatuses$: Observable<ProductStatus[]> = this.ermSrv.getStatusService(ERM.PRODUCT)
		.queryAll('name, category, step, inWorkflow', { sortBy: 'step' }).pipe(
			shareReplay(1)
		);
	supplierStatuses$: Observable<SupplierStatus[]> = this.ermSrv.getStatusService(ERM.SUPPLIER)
		.queryAll('name, category, step, inWorkflow', { sortBy: 'step' }).pipe(
			shareReplay(1)
		);
	sampleStatus$: Observable<SampleStatus[]> = this.ermSrv.getStatusService(ERM.SAMPLE)
		.queryAll('name, cateogry, inWorkflow', { descending: false }).pipe(
			shareReplay(1)
		);

	constructor(
		private ermSrv: ERMService,
		private taskSrv: TaskService
	) {

	}

	getTableStatus(typeEntity: EntityMetadata): Observable<SupplierStatus[] | ProductStatus[] | SampleStatus[]> {
		switch (typeEntity) {
			case ERM.PRODUCT: return this.productStatuses$;
			case ERM.SUPPLIER: return this.supplierStatuses$;
			case ERM.SAMPLE: return this.sampleStatus$;
		}
	}

	updateStatus(entity, typeEntity: EntityMetadata) {
		return this.ermSrv.getGlobalService(typeEntity).update(entity);
	}

	updateTask(entity) {
		this.taskSrv.update(entity).subscribe();
	}
}
