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
	// comparator function for the favorite column, so the table can order it
	favoriteComparator = (a, b) => (b.rating || 0) - (a.rating || 0);

	constructor(private store: Store<any>) { }

	ngOnInit() {
		const supplierState$ = this.store.select(fromSupplier.selectState);
		const countryById$ = this.store.select(fromCountry.selectById).pipe(filter(byId => Object.keys(byId).length > 0));
		const teamMemberById$ = this.store.select(fromTeamMember.selectById).pipe(filter(byId => Object.keys(byId).length > 0));
		this.rows$ = combineLatest(supplierState$, countryById$, teamMemberById$).pipe(
			map(([supplierState, countryById, memberById]) => {
				return supplierState.ids.map(id => {
					const supplier = supplierState.byId[id];
					return {
						...supplier,
						countryName: supplier.countryCode ? countryById[supplier.countryCode].fullName : '',
						createdByName: memberById ? memberById[supplier.createdByUserId].name : '',
						createdBy: memberById ? memberById[supplier.createdByUserId] : undefined,
					};
				});
			}));
	}

	onSort({ order, sortWith }) {
		// // we first need to remove the current sorting filter
		// this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSort));
		// // then we add a new one
		// const filter = new FilterSort(sortWith, order.toUpperCase());
		// this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}
}
