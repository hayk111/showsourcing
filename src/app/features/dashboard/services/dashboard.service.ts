import { Injectable } from '@angular/core';
import { ProductService, SupplierService, TaskService } from '~global-services';
import { Observable, forkJoin } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Task } from '~models';
import { realmDateFormat } from '~utils/realm-date-format.util';

export interface DashboardCounters {
	productsNeedReview: number;
	productsInWorkflow: number;
	suppliersUnderAssessment: number;
	totalTasks: number;
	tasksDone: number;
}

@Injectable({
	providedIn: 'root'
})
export class DashboardService {

	constructor(
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		private taskSrv: TaskService
	) { }

	getCounters(): Observable<DashboardCounters> {
		return forkJoin([
			this.getCountProductsNeedReview(),
			this.getCountProductsInWorkflow(),
			this.getCountSupplierUnderAssessment(),
			this.getCountTotalTasks(),
			this.getCountTasksDone()
		]).pipe(
			map(([a, b, c, d, e]) => ({
				productsNeedReview: a,
				productsInWorkflow: b,
				suppliersUnderAssessment: c,
				totalTasks: d,
				tasksDone: e
			}))
		);
	}

	getCountProductsNeedReview(): Observable<number> {
		// products that have no status are the products that need review..
		return this.productSrv.queryCount('status == NULL && archived == false && deleted == false').pipe(first());
	}

	getCountProductsInWorkflow(): Observable<number> {
		return this.productSrv.queryCount('status.status.inWorkflow == true && archived == false && deleted == false').pipe(first());
	}

	getCountSupplierUnderAssessment(): Observable<number> {
		return this.supplierSrv.queryCount('status.status.name == "_UnderAssessment" && deleted == false').pipe(first());
	}

	getCountTotalTasks(): Observable<number> {
		const now = realmDateFormat(new Date());
		return this.taskSrv.queryCount(`dueDate > ${now}`).pipe(first());
	}

	getCountTasksDone(): Observable<number> {
		const now = realmDateFormat(new Date());
		return this.taskSrv.queryCount(`dueDate > ${now} AND done == true`).pipe(first());
	}

	getFirstFewTasks(): Observable<Task[]> {
		return this.taskSrv.queryMany({ take: 3, query: 'deleted == false' }).pipe(first());
	}
}
