import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Supplier } from '../../../../store/model/supplier.model';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { EntityState, entityStateToArray } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/product.model';

@Component({
	selector: 'product-list-view-app',
	templateUrl: './product-list-view.component.html',
	styleUrls: ['./product-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListViewComponent implements OnInit {
	suppliers$: Observable<EntityState<Supplier>>;
	products = [];
	displayedColumns = ['name', 'category', 'supplier', 'price', 'rating'];
	dataSource;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.suppliers$ = this.store.select('suppliers');
	}

	@Input() set productEntities(pe: EntityState<Product>) {
		this.products = entityStateToArray(pe);
		this.dataSource = new MatTableDataSource(this.products);
	}

}
