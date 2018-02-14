import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { entityStateToArray, EntityState } from '../../../../store/utils/entities.utils';
import { MatTableDataSource } from '@angular/material';
import { Supplier } from '../../../../store/model/entities/supplier.model';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: ['./supplier-list-view.component.scss']
})
export class SupplierListViewComponent implements OnInit {
	@Input() suppliers: Array<Supplier> = [];

	constructor() { }

	ngOnInit() {
	}

}
