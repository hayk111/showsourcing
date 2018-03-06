import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
	debounceTime,
	filter,
	switchMap,
	takeUntil,
	tap,
	map,
} from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import { ERM, EntityRepresentation, EntityTarget } from '~app/shared/entity';
import {
	SearchedEntities,
	searchEntities,
	selectFiltersValues,
	selectFilterGroup,
} from '~shared/filters/store/selectors';
import {
	FilterGroupName,
	FilterSearch,
	FilterSupplier,
	FilterEvent,
	FilterCategory,
	Filter,
} from '~shared/filters/models';

import { FilterActions } from '../../store/actions';

@Component({
	selector: 'filter-search-bar-app',
	templateUrl: './filter-search-bar.component.html',
	styleUrls: ['./filter-search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('searchAnimation', [
			state(
				'shrinked',
				style({
					width: '0%',
					opacity: 0,
				})
			),
			state(
				'expanded',
				style({
					width: '100%',
					opacity: 1,
					marginLeft: '10px',
				})
			),
			transition('expanded => shrinked', [
				animate('200ms ease-in-out', style({ width: '0%', opacity: 0 })),
			]),
			transition('shrinked => expanded', [
				animate('200ms ease-in-out', style({ width: '100%', opacity: 1 })),
			]),
		]),
	],
})
export class FilterSearchBarComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@ViewChild('searchbox') public searchbox: ElementRef;

	private searched = [ERM.suppliers, ERM.events, ERM.categories, ERM.projects];
	// we need the filter also because we need to also display the selected chocies
	searchControl = new FormControl('');
	smartSearch$: Observable<Array<SearchedEntities>>;
	smartSearchSelection$: Observable<any>;
	smartPanelVisible = false;
	searchstate = 'shrinked';

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		// when the control changes we make a smart search
		this.smartSearch$ = this.searchControl.valueChanges.pipe(
			takeUntil(this._destroy$),
			debounceTime(400),
			filter(value => value.length > 2),
			switchMap(value => this.store.select(searchEntities(this.searched, value))),
			tap(d => (this.smartPanelVisible = true))
		);
		// selection is basically the filters applied, since when doing a selection we just add a filter.
		this.smartSearchSelection$ = this.store
			.select(selectFilterGroup(this.filterGroupName))
			// making it { value: true } for O(1) access time
			.pipe(
				map((filters: Array<Filter>) =>
					filters.reduce(
						(prev: Map<string, true>, curr: Filter) => prev.set(curr.value, true),
						new Map()
					)
				)
			);
	}

	onKeyDown() {}
	// when the user press enter on input we make a normal search
	search() {
		const value = this.searchControl.value;
		const filter = new FilterSearch(value);
		this.store.dispatch(
			FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSearch)
		);
		if (value) {
			this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
		}
	}

	closeSmartSearch() {
		this.smartPanelVisible = false;
	}

	expandSearch() {
		this.searchstate = this.searchstate === 'expanded' ? 'shrinked' : 'expanded';
		if (this.searchstate === 'expanded') {
			this.searchbox.nativeElement.focus();
		}
	}

	clearSearch() {
		this.searchstate = 'shrinked';
	}

	addFromSmart(filter: Filter) {
		this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}

	removeFromSmart(filter: Filter) {
		this.store.dispatch(FilterActions.removeFilter(filter, this.filterGroupName));
	}
}
