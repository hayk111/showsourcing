import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../../../store/action/filter.action';
import { FilterGroupName, filterRepresentationMap } from '../../../../store/model/filter.model';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { selectFilterValuesForEntity } from '../../../../store/selectors/filter.selectors';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'filter-product-sort-panel-app',
	templateUrl: './filter-product-sort-panel.component.html',
	styleUrls: ['./filter-product-sort-panel.component.scss']
})
export class FilterProductSortPanelComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	sortings = [
		{ title: 'Creation Date', value: 'creationDate' },
		{ title: 'User', value: 'user' },
		{ title: 'Rating', value: 'rating' },
		{ title: 'Category', value: 'category' },
		{ title: 'Supplier', value: 'supplier' }
	];
	selectedSorting;
	private repr = filterRepresentationMap.sortByProduct;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.select(selectFilterValuesForEntity(this.filterGroupName, this.repr))
			.takeUntil(this._destroy$)
			.subscribe(valArr => {
				if (valArr[0])
					this.selectedSorting = valArr[0];
			});
	}

	onChange(v: string) {
		const removeAction = FilterActions.removeFiltersForFilterReprs(this.filterGroupName, [this.repr]);
		const addAction = FilterActions.addFilter(this.filterGroupName, this.repr, `sort: ${v}`, v);
		this.store.dispatch(removeAction);
		this.store.dispatch(addAction);
		this.selectedSorting = v;
	}
}
