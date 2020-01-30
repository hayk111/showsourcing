import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { TaskService, ProjectService } from '~core/ORM/services';
import { ERMService } from '~entity-services/_global/erm.service';
import { EntityMetadata, ERM, SampleStatus, SupplierStatus, ProductStatus } from '~models';

@Injectable({
	providedIn: 'root'
})
export class StatusSelectorService {

	private _statusUpdate$ = new Subject<void>();
	statusUpdate$ = this._statusUpdate$.asObservable();

	// if we dont want to see all at once and use a scroll for this, instead of query all
	// we need queryList, so we can refetch. And the workflow.html need infiniteScroll
	productStatuses$: Observable<ProductStatus[]> = this.ermSrv.getStatusService(ERM.PRODUCT_STATUS)
		.queryAll('', { sortBy: 'step', descending: false }).pipe(
			shareReplay(1)
		);
	supplierStatuses$: Observable<SupplierStatus[]> = this.ermSrv.getStatusService(ERM.SUPPLIER_STATUS)
		.queryAll('', { sortBy: 'step', descending: false }).pipe(
			shareReplay(1)
		);
	sampleStatus$: Observable<SampleStatus[]> = this.ermSrv.getStatusService(ERM.SAMPLE_STATUS)
		.queryAll('', { sortBy: 'step', descending: false }).pipe(
			shareReplay(1)
		);

	constructor(
		private ermSrv: ERMService,
		private taskSrv: TaskService,
		private projectSrv: ProjectService
	) {

	}

	getTableStatus(typeEntity: EntityMetadata): Observable<SupplierStatus[] | ProductStatus[] | SampleStatus[]> {
		switch (typeEntity) {
			case ERM.PRODUCT_STATUS:
			case ERM.PRODUCT: return this.productStatuses$;
			case ERM.SUPPLIER_STATUS:
			case ERM.SUPPLIER: return this.supplierStatuses$;
			case ERM.SAMPLE_STATUS:
			case ERM.SAMPLE: return this.sampleStatus$;
			default: return of();
		}
	}

	updateStatus(entity, typeEntity: EntityMetadata) {
		this._statusUpdate$.next();
		return this.ermSrv.getGlobalService(typeEntity).update(entity);
	}

	updateTask(entity) {
		this.taskSrv.update(entity).subscribe();
	}

	updateProject(entity) {
		this.projectSrv.update(entity).subscribe();
	}
}
