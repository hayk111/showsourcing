import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ProductService, SupplierService, TaskService, UserService } from '~entity-services';
import { Task } from '~models';
import { ID } from '~utils/id.utils';
import { toRealmDateFormat } from '~utils/realm-date-format.util';

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

	userId: ID;
	/** magic number for 2 weeks in miliseconds */
	twoWeeks = 12096e5;
	weeksAgo = toRealmDateFormat(new Date(+new Date - this.twoWeeks));

	constructor(
		private userSrv: UserService,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		private taskSrv: TaskService
	) {
		this.userSrv.selectUser().subscribe(user => this.userId = user.id);
	}

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
		return this.productSrv.queryCount('status == null && archived == false').pipe(first());
	}

	getCountProductsInWorkflow(): Observable<number> {
		return this.productSrv.queryCount(
			'status.id != null && status.inWorkflow == true ' +
			'&& archived == false'
		).pipe(first());
	}

	getCountSupplierUnderAssessment(): Observable<number> {
		return this.supplierSrv.queryCount(
			'status.name == "_UnderAssessment"'
		).pipe(first());
	}

	getCountTotalTasks(): Observable<number> {
		return this.taskSrv.queryCount(
			`(dueDate > ${this.weeksAgo} OR dueDate == null)&& assignee.id == "${this.userId}"`
		).pipe(first());
	}

	getCountTasksDone(): Observable<number> {
		return this.taskSrv.queryCount(
			`(dueDate > ${this.weeksAgo} OR dueDate == null) ` +
			`&& done == true && assignee.id == "${this.userId}"`
		).pipe(first());
	}

	getFirstFewTasks(): Observable<Task[]> {
		return this.taskSrv.queryMany({
			take: 5,
			query: `(dueDate > ${this.weeksAgo} OR dueDate == null)	` +
				`&& done == false && assignee.id == "${this.userId}"`,
			descending: false
		}).pipe();
	}

	updateTask(task: Task) {
		this.taskSrv.update(task).subscribe();
	}
}
