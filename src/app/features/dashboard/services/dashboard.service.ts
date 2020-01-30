import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ProductService, SupplierService, TaskService, UserService, SampleService } from '~core/ORM/services';
import { Task, Product, Supplier, Sample } from '~core/ORM/models';
import { ID } from '~utils/id.utils';
import { toRealmDateFormat } from '~utils/realm-date-format.util';
import { Router } from '@angular/router';

export interface DashboardCounters {
	productsNeedReview: number;
	productsInWorkflow: number;
	suppliersUnderAssessment: number;
	totalTasks: number;
	tasksDone: number;
}

export interface TodoCounts {
	product?: number;
	task?: number;
	supplier?: number;
	sample?: number;
}

export interface TodoEntities {
	product: Product[];
	task: Task[];
	supplier: Supplier[];
	sample: Sample[];
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
		private router: Router,
		private userSrv: UserService,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
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


	getFirstFewEntitiesAssignedToMe(): Observable<TodoEntities> {
		return forkJoin([
			this.getFirstFewProducts(),
			this.getFirstFewTasks(),
			this.getFirstFewSupplierTodo(),
			this.getFirstFewSamplesTodo(),
		]).pipe(
			map(([a, b, c, d]) => ({
				product: a,
				task: b,
				supplier: c,
				sample: d,
			}))
		);

	}

	getTodoCounters(): Observable<TodoCounts> {
		return forkJoin([
			this.getCountProductsTodo(),
			this.getCountTasksTodo(),
			this.getCountSupplierTodo(),
			this.getCountSamplesTodo()
		]).pipe(
			map(([a, b, c, d]) => ({
				product: a,
				task: b,
				supplier: c,
				sample: d
			}))
		);
	}

	getCountProductsNeedReview(): Observable<number> {
		// products that have no status are the products that need review..
		return this.productSrv.queryCount('status == null && archived == false').pipe(first());
	}

	getCountProductsTodo(): Observable<number> {
		return this.productSrv.queryCount(
			`assignee.id == "${this.userId}" && archived == false && deleted == false && status.final == false`
		).pipe(first());
	}

	getFirstFewProducts(): Observable<Product[]> {
		return this.productSrv.queryMany({
			take: 4,
			query: `assignee.id == "${this.userId}" && archived == false && deleted == false && status.final == false`,
			descending: false
		}).pipe(first());
	}

	getCountProductsInWorkflow(): Observable<number> {
		return this.productSrv.queryCount(
			'status.id != null && status.inWorkflow == true ' +
			'&& archived == false'
		).pipe(first());
	}

	getCountSupplierTodo(): Observable<number> {
		return this.supplierSrv.queryCount(
			`assignee.id == "${this.userId}" AND deleted == false AND archived == false`
		).pipe(first());
	}

	getFirstFewSupplierTodo(): Observable<Supplier[]> {
		return this.supplierSrv.queryMany({
			take: 4,
			query: `assignee.id == "${this.userId}" AND deleted == false AND archived == false`,
			descending: false,
		}).pipe(first());
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

	getCountTasksTodo(): Observable<number> {
		return this.taskSrv.queryCount(
			`assignee.id == "${this.userId}" AND done == false AND deleted == false AND archived == false`
		).pipe(first());
	}

	getFirstFewTasks(): Observable<Task[]> {
		return this.taskSrv.queryMany({
			take: 4,

			query: `done == false && assignee.id == "${this.userId}" AND deleted == false AND archived == false`,
			descending: false
		}).pipe(first());
	}

	updateTask(task: Task) {
		this.taskSrv.update(task).subscribe();
	}

	getCountSamplesTodo() {
		return this.sampleSrv.queryCount(
			`assignee.id == "${this.userId}" AND deleted == false AND archived == false`
		).pipe(first());
	}

	getFirstFewSamplesTodo(): Observable<Sample[]> {
		return this.sampleSrv.queryMany({
			take: 4,
			query: `assignee.id == "${this.userId}" AND deleted == false AND archived == false`
		}).pipe(first());
	}

	redirect(route: string) {
		this.router.navigate([route]);
	}

}
