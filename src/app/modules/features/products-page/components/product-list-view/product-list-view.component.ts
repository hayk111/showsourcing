import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Supplier } from '../../../../store/model/supplier.model';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'product-list-view-app',
  templateUrl: './product-list-view.component.html',
	styleUrls: ['./product-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListViewComponent implements OnInit {
	displayedColumns: ['name', 'supplier', 'category', 'status'];
	suppliers$: Observable<Supplier>;
	@Input('products') products$;

  constructor(private store: Store<any>) { }

  ngOnInit() {
		this.suppliers$ = this.store.select('suppliers');
  }

}
