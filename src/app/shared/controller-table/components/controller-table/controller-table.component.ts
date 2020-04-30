import { Component, Input, ContentChild, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListPageViewService } from '~core/list-page2';
import { ControllerTableViewSwitcherComponent } from '../controller-table-view-switcher/controller-table-view-switcher.component';
import { ControllerTableContentComponent } from '../controller-table-content/controller-table-content.component';
import { ControllerTableQuickFiltersComponent } from '../controller-table-quick-filters/controller-table-quick-filters.component';
import { FilterService } from '~core/filters';
import { SearchBarComponent } from '~shared/search-bar-animated/components/search-bar/search-bar.component';

export type Panel = 'search' | 'filters' | 'actions' | 'quick-filters' | 'view-switcher';

@Component({
	selector: 'controller-table-app',
	templateUrl: './controller-table.component.html',
	styleUrls: ['./controller-table.component.scss'],
	host: {
		class: 'flexBetween'
	}
})
export class ControllerTableComponent {
	/** describes the layout of the controller-table */
	@Input() hasFilters = true;
	@Input() hasExtra = false;
	@Input() total: number;
	@ContentChild(ControllerTableViewSwitcherComponent, { static: true })
	switcher: ControllerTableViewSwitcherComponent;
	@ContentChild(ControllerTableContentComponent, { static: true })
	content: ControllerTableContentComponent;
	@ContentChild(ControllerTableQuickFiltersComponent, { static: true })
	quickFilters: ControllerTableQuickFiltersComponent;

	@ViewChild('searchBar', { static: false }) searchBar: SearchBarComponent;

	searchControl: FormControl = new FormControl('');
	inputFocus = false;

	constructor(
		public filterSrv: FilterService,
		public viewSrv: ListPageViewService<any>,
	) {}

	reset() {
		this.filterSrv.reset();
		this.searchBar.reset();
	}
}
