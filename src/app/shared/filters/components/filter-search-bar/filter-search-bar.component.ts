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
import { Store } from '@ngrx/store';
import {
	FilterCategory,
	FilterEvent,
	FilterGroupName,
	FilterSearch,
	FilterSupplier,
} from '~shared/filters/models';
import { SmartSearch } from '~shared/filters';
import { FilterActions } from '../../store/actions';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';

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
	@Input() searched = [FilterEvent, FilterSupplier, FilterCategory];
	searchControl = new FormControl('');
	smartSearchResult: Array<SmartSearch> = [];
	public searchstate = 'shrinked';
	@ViewChild('searchbox') public searchbox: ElementRef;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.searchControl.valueChanges
			.pipe(takeUntil(this._destroy$), debounceTime(400))
			.subscribe(value => this.search(value));
	}

	search(value) {
		const filter = new FilterSearch(value);
		this.store.dispatch(
			FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSearch)
		);
		if (value) {
			this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
		}
	}

	public expandSearch() {
		this.searchstate = this.searchstate === 'expanded' ? 'shrinked' : 'expanded';
		if (this.searchstate === 'expanded') {
			this.searchbox.nativeElement.focus();
		}
	}

	public clearSearch() {
		this.searchstate = 'shrinked';
	}
}
