import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FilterClass, FilterGroupName } from '~store/model/misc/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FilterPanelAction } from '~store/action/ui/filter-panel.action';
import { selectFilterPanelOpen } from '~store/selectors/ui/filter-panel.selector';
import { selectViewSwitcher } from '~store/selectors/ui/view-switcher.selector';

@Component({
	selector: 'filtered-list-page-app',
	templateUrl: './filtered-list-page.component.html',
	styleUrls: ['./filtered-list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredListPageComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() filterClasses: Array<FilterClass>;
	@Input() pending = true;
	filterPanelOpen$: Observable<boolean>;
	view$: Observable<string>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.filterPanelOpen$ = this.store.select(selectFilterPanelOpen);
		this.view$ = this.store.select(selectViewSwitcher);
	}

	openFilters() {
		this.store.dispatch(FilterPanelAction.open());
	}

}
