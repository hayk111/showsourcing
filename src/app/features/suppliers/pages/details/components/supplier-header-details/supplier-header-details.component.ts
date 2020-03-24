import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ContactService, ProductService, SampleService, TaskService } from '~core/erm';
import { Supplier } from '~core/erm';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'supplier-header-details-app',
	templateUrl: './supplier-header-details.component.html',
	styleUrls: ['./supplier-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierHeaderDetailsComponent extends AutoUnsub implements OnInit {
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
		private route: ActivatedRoute,
		private location: Location
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);
	}

	goBack() {
		this.location.back();
	}

}
