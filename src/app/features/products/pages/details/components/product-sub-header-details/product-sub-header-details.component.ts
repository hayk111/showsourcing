import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, Supplier, Sample } from '~core/erm3';
import { api } from 'lib';

@Component({
	selector: 'product-sub-header-details-app',
	templateUrl: './product-sub-header-details.component.html',
	styleUrls: ['./product-sub-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSubHeaderDetailsComponent implements OnInit {
	@Input() product: Product;
	@Output() updated = new EventEmitter<Product>();
	@Output() redirect = new EventEmitter<string>();
	@Output() ratingClicked = new EventEmitter<undefined>();
	@Output() openSupplier = new EventEmitter<Supplier>();

	samplesCount$: Observable<number>;
	tasksCount$: Observable<number>;
	commentsCount$: Observable<number>;

	constructor() { }

	ngOnInit() {
		this.samplesCount$ = api.Product.samples(this.product.id).count$;
		this.tasksCount$ = api.Product.tasks(this.product.id).count$;
		this.commentsCount$ = api.Product.comments(this.product.id).count$;
	}

	update(value: any, prop: string) {
		console.log('ProductSubHeaderDetailsComponent -> update -> value', value);
		console.log('ProductSubHeaderDetailsComponent -> update -> prop----------', prop);
		this.updated.emit({ id: this.product.id, [prop + 'Id']: value[prop + 'Id'] });
	}

	onOpenSupplier(supplier: Supplier, event: MouseEvent) {
		// we stop the propagation of the click so the editable container is not opened
		event.stopImmediatePropagation();
		this.openSupplier.emit(supplier);
	}

}
