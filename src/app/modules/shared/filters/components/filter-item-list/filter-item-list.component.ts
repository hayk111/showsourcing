import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, combineLatest, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState } from '../../../../store/utils/entities.utils';
import { FilterById } from '../../utils/filter-by-id';
import { Subject } from 'rxjs/Subject';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { distinct, takeUntil } from 'rxjs/operators';
import { FilterActions } from '../../../../store/action/filter.action';
import { selectFiltersWithChecked } from '../../../../store/selectors/filter.selectors';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { filter } from 'rxjs/operators/filter';

@Component({
	selector: 'filter-item-list-app',
	templateUrl: './filter-item-list.component.html',
	styleUrls: ['./filter-item-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterItemListComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	private _target: string;
	target$ = new Observable<string>();
	items$: Observable<EntityState<any>>;
	search = '';


	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.target$ = this.store.select(dotSelector('misc.filterItemListPanel.target'));
		this.target$.pipe(
			takeUntil(this._destroy$),
			filter(t => t !== undefined),
			distinctUntilChanged()
		).subscribe(t => {
			this._target = t;
			this.items$ = this.store.select(selectFiltersWithChecked(this.filterGroupName, t));
		});
	}


	onChange(event, itemName, itemId) {
		if (event.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this._target, itemName, itemId));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this._target, itemId));
	}

}
