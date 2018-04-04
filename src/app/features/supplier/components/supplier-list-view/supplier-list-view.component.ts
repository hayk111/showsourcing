import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions, FilterGroupName, FilterSort } from '~app/shared/filters';
import { Country, EntityState, fromTeamMember, Supplier } from '~entity';
import { fromCountry } from '~app/entity/store/country/country.bundle';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: ['./supplier-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListViewComponent implements OnInit {
	@Input() suppliers: Array<Supplier> = [];
	@Input() productsCount: { [key: string]: number }; // { id: numberProducts }
	@Input() selection: Map<string, boolean>;
	@Output() supplierSelect = new EventEmitter<string>();
	@Output() supplierUnselect = new EventEmitter<string>();
	@Output() supplierOpen = new EventEmitter<string>();
	@Output() supplierFavorited = new EventEmitter<string>();
	@Output() supplierUnfavorited = new EventEmitter<string>();
	countryState: EntityState<Country>;
	teamMemberState: EntityState<any>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		// subscribing here once instead subscribing for each row with | async
		// although we could use the ng-container
		this.store.select(fromCountry.selectState).subscribe(state => this.countryState = state);
		this.store.select(fromTeamMember.selectState).subscribe(state => this.teamMemberState = state);
	}

	onSort({ order, sortWith }) {
		// // we first need to remove the current sorting filter
		// this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSort));
		// // then we add a new one
		// const filter = new FilterSort(sortWith, order.toUpperCase());
		// this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}
}
