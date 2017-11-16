import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Filter, FilterGroup, FilterGroupName } from '../../../../store/model/filter.model';
import { selectFilterCategory, selectFilterGroup } from '../../../../store/selectors/filter.selectors';

@Component({
	selector: 'product-filters-app',
	templateUrl: './product-filters.component.html',
	styleUrls: ['./product-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	filters$: Observable<Array<Filter>>;
	listToOpen: string;
	isListOpen = false;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
	}

	openList(item: string) {
		this.listToOpen = item;
		this.isListOpen = true;
	}

}
