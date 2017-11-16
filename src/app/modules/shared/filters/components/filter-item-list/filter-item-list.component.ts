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



@Component({
	selector: 'filter-item-list-app',
	templateUrl: './filter-item-list.component.html',
	styleUrls: ['./filter-item-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterItemListComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	private _target: string;
	private target$ = new Subject<string>();
	@Output() change = new EventEmitter<FilterById>();
	items$: Observable<EntityState<any>>;


	constructor(private store: Store<any>) {
		super();
		this.target$.pipe(
			takeUntil(this._destroy$),
			distinctUntilChanged()
		).subscribe(t => {
			this.items$ = this.store.select(selectFiltersWithChecked(this.filterGroupName, t));
		});
	}

	ngOnInit() {
	}

	@Input()
	set target(targetName: string) {
		if (!targetName)
			return;
		this._target = targetName;
		this.target$.next(targetName);
	}

	onChange(event, itemName, itemId) {
		if (event.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this._target, itemName, itemId));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this._target, itemId));
	}

}
