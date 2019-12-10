import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService, ProductService, SampleService, TaskService, UserService } from '~core/entity-services';
import { Supplier } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'supplier-header-details-app',
	templateUrl: './supplier-header-details.component.html',
	styleUrls: ['./supplier-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierHeaderDetailsComponent extends TrackingComponent implements OnChanges {
	@Input() supplier: Supplier;
	@Output() delete = new EventEmitter<Supplier>();
	@Output() archive = new EventEmitter<Supplier>();
	@Output() export = new EventEmitter<Supplier>();
	@Output() contact = new EventEmitter<Supplier>();

	tasksCount$: Observable<number>;
	samplesCount$: Observable<number>;
	productsCount$: Observable<number>;
	contactsCount$: Observable<number>;

	constructor(
		private location: Location,
		private sampleSrv: SampleService,
		private productSrv: ProductService,
		private taskSrv: TaskService,
		private contactSrv: ContactService
	) {
		super();
	}

	ngOnChanges() {
		this.tasksCount$ = this.taskSrv.selectCount(`supplier.id == "${this.supplier.id}" AND deleted == false AND archived == false`)
			.pipe(distinctUntilChanged());
		this.samplesCount$ = this.sampleSrv.selectCount(`supplier.id == "${this.supplier.id}" AND deleted == false AND archived == false`)
			.pipe(distinctUntilChanged());
		this.productsCount$ = this.productSrv.selectCount(`supplier.id == "${this.supplier.id}" AND deleted == false AND archived == false`)
			.pipe(distinctUntilChanged());
		this.contactsCount$ = this.contactSrv.selectCount(`supplier.id == "${this.supplier.id}" AND deleted == false`)
			.pipe(distinctUntilChanged());
	}

	goBack() {
		this.location.back();
	}

}
