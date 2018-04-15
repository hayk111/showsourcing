import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions, FilterGroupName } from '~app/shared/filters';
import { Country, EntityState, fromTeamMember, Supplier, fromSupplier } from '~entity';
import { fromCountry } from '~app/entity/store/country/country.bundle';
import { tap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: ['./supplier-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListViewComponent implements OnInit {
	@Input() productsCount: { [key: string]: number }; // { id: numberProducts }
	@Input() selection: Map<string, boolean>;
	@Output() supplierSelect = new EventEmitter<string>();
	@Output() supplierUnselect = new EventEmitter<string>();
	@Output() supplierOpen = new EventEmitter<string>();
	@Output() supplierFavorited = new EventEmitter<string>();
	@Output() supplierUnfavorited = new EventEmitter<string>();
	rows$: Observable<any>;
	// used to sort by tags or by categories
	arrayComparator = (a, b) => (b || []).length - (a || []).length;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.rows$ = this.store.select(fromSupplier.selectSupplierList);
	}

}
