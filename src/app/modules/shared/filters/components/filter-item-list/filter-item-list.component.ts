import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState, EntityRepresentation, Entity } from '../../../../store/utils/entities.utils';
import { FilterById } from '../../utils/filter-by-id';
import { Subject } from 'rxjs/Subject';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { takeUntil } from 'rxjs/operators';
import { FilterActions } from '../../../../store/action/filter.action';
import { selectFilterValuesForEntity } from '../../../../store/selectors/filter.selectors';
import { FilterGroupName, FilterRepresentation } from '../../../../store/model/filter.model';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { filter } from 'rxjs/operators/filter';
import { MiscActions } from '../../../../store/action/misc.action';
import { CounterService } from '../../services/counter.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../store/model/user.model';
import { selectUser } from '../../../../store/selectors/user.selector';
import { selectFilterPanel } from '../../../../store/selectors/filter-panel.selector';
import { selectFilterSelectionPanelTarget } from '../../../../store/selectors/filter-selection-panel.selector';
import { selectFilesForTarget } from '../../../../store/selectors/file.selector';
import { SelectableItem } from '../../../inputs/components/vanilla/input-checkbox/input-checkbox.component';
import { selectEntityArray } from '../../../../store/selectors/utils.selector';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { searchEntity } from '../../../../store/selectors/search-entities.selector';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormControl } from '@angular/forms';
// when we filter an entity in the store this is the reused panel

@Component({
	selector: 'filter-item-list-app',
	templateUrl: './filter-item-list.component.html',
	styleUrls: ['./filter-item-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ CounterService ]
})
export class FilterItemListComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	filterRep: FilterRepresentation;
	filterRep$ = new Observable<FilterRepresentation>();
	search$ = new BehaviorSubject<string>('');
	values: Array<any>;
	choices$: Observable<Array<SelectableItem>>;
	relevantChoices$: Observable<Array<SelectableItem>>;
	private countStr = 'countProdsBy';


	constructor(private store: Store<any>,
							private counterSrv: CounterService) {
		super();
	}

	ngOnInit() {
		// we select the entityRep for the filter selection panel to know what entity
		// we want to display
		this.filterRep$ = this.store.select(selectFilterSelectionPanelTarget);
		this.filterRep$.takeUntil(this._destroy$).subscribe(rep => this.filterRep = rep);
		// can be removed
		this.counterSrv.init(this.filterGroupName);

		// select values
		this.filterRep$.pipe(
			switchMap(repr => this.store.select(selectFilterValuesForEntity(this.filterGroupName, repr))),
			takeUntil(this._destroy$),
		).subscribe(v => this.values = v);

		// select entities
		const entities$ =  this.filterRep$.pipe(
			switchMap(rep => this.store.select(selectEntityArray(rep))),
		);
		this.choices$ = combineLatest(this.filterRep$, this.search$, (rep, search) => ({rep, search}))
		.pipe(
			switchMap(sr => this.store.select(searchEntity(sr.rep, sr.search)))
		);

		// filter only relevant entities
		const relevant$ = this.filterRep$.pipe(
			switchMap(repr => this.counterSrv.getItemsWithCount(repr)),
		);

		this.relevantChoices$ = combineLatest(relevant$, this.search$, (relevant, search) => {
			return search ? relevant.filter(r => r.name.includes(search)) : relevant;
		});
	}

	onItemAdded(item) {
		this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this.filterRep, item.name, item.id));
	}

	onItemRemoved(item) {
		this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this.filterRep, item.id));
	}

	search(value) {
		this.search$.next(value);
	}

}
