import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { FilterGroupName, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { MiscActions } from '../../../../store/action/misc.action';
import { MatTableDataSource } from '@angular/material';
import { FilterPanelAction } from '../../../../store/action/filter-panel.action';
import { selectFilterPanel, selectFilterPanelOpen } from '../../../../store/selectors/filter-panel.selector';
import { selectViewSwitcher } from '../../../../store/selectors/view-switcher.selector';

@Component({
	selector: 'filtered-list-page-app',
	templateUrl: './filtered-list-page.component.html',
	styleUrls: ['./filtered-list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredListPageComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() pending = true;
	searchableEntitiesRepr = [
		entityRepresentationMap.suppliers,
		entityRepresentationMap.events,
		entityRepresentationMap.categories,
		entityRepresentationMap.projects,
		entityRepresentationMap.tags
	];
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
