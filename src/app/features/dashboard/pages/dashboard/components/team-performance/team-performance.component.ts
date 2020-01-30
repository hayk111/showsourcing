import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductService, SampleService, SupplierService, TaskService, UserService } from '~core/erm';
import { SelectParams } from '~core/erm';
import { Sample, Task } from '~core/erm';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'team-performance-app',
	templateUrl: './team-performance.component.html',
	styleUrls: ['./team-performance.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPerformanceComponent extends TrackingComponent implements OnInit {

	tasks$: Observable<Task[]>;
	samples$: Observable<Sample[]>;

	products$: Observable<number>;
	suppliers$: Observable<number>;
	productsAssignedToMe$: Observable<number>;
	suppliersAssignedToMe$: Observable<number>;

	constructor(
		private route: Router,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
		private supplierSrv: SupplierService,
		private productSrv: ProductService,
		private userSrv: UserService,
		public dlgCommonSrv: DialogCommonService
	) {
		super();
	}

	ngOnInit() {
		const userId = this.userSrv.userId;

		let selectParams = new SelectParams({ query: `assignee.id == "${userId}" AND done == false` });
		this.tasks$ = this.taskSrv.queryMany(selectParams);

		selectParams = { ...selectParams, query: `assignee.id == "${userId}"` };
		this.samples$ = this.sampleSrv.queryMany(selectParams);

		this.products$ = this.productSrv.queryCount(`deleted == false AND archived == false`);
		this.productsAssignedToMe$ = this.productSrv.queryCount(`deleted == false AND archived == false AND assignee.id == "${userId}"`);

		this.suppliers$ = this.supplierSrv.queryCount(`deleted == false AND archived == false`);
		this.suppliersAssignedToMe$ = this.supplierSrv.queryCount(`deleted == false AND archived == false AND assignee.id == "${userId}"`);
	}

	redirect(path: string) {
		this.route.navigate(['/', path]);
	}

}
