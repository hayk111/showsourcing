import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { entityStateToArray, EntityState } from '../../../../store/utils/entities.utils';
import { MatTableDataSource } from '@angular/material';
import { Supplier } from '../../../../store/model/supplier.model';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: ['./supplier-list-view.component.scss']
})
export class SupplierListViewComponent implements OnInit {
	displayedColumns = ['name', 'rating', 'creationDate'];
	dataSource;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.store.select('suppliers')
		.subscribe((sups: EntityState<Supplier>) => {
			const arr = entityStateToArray(sups);
			this.dataSource = new MatTableDataSource(arr);
		});
	}

}
