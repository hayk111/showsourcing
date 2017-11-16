import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState, Entity } from '../../../../store/utils/entities.utils';
import { Filter, FilterGroupName } from '../../../../store/model/filter.model';
import { selectActiveFiltersForCategory } from '../../../../store/selectors/filter.selectors';
import { FilterActions } from '../../../../store/action/filter.action';

@Component({
	selector: 'filter-app',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
	@Input() filterName: FilterGroupName;
	@Input() target: string;
	@Output() itemClicked = new EventEmitter();
	items$: Observable<Array<Entity>>;


	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.items$ = this.store.select(selectActiveFiltersForCategory(this.filterName, this.target));
	}

	removeFilter(id: string) {
		this.store.dispatch(FilterActions.removeFilter(this.filterName, this.target, id));
	}


}
