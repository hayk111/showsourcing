import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { FilterGroupName, FilterClass } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MiscActions } from '../../../../store/action/misc.action';
import { MatTableDataSource } from '@angular/material';
import { FilterPanelAction } from '../../../../store/action/filter-panel.action';
import { selectFilterPanel, selectFilterPanelOpen } from '../../../../store/selectors/filter-panel.selector';
import { selectViewSwitcher } from '../../../../store/selectors/view-switcher.selector';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';

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
