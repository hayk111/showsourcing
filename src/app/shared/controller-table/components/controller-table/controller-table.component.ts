import { Component, Input, ContentChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListPageService } from '~core/list-page';
import { ControllerTableViewSwitcherComponent } from '../controller-table-view-switcher/controller-table-view-switcher.component';
import { ControllerTableContentComponent } from '../controller-table-content/controller-table-content.component';
import { ControllerTableQuickFiltersComponent } from '../controller-table-quick-filters/controller-table-quick-filters.component';

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
	@ContentChild(ControllerTableViewSwitcherComponent, { static: true })
	switcher: ControllerTableViewSwitcherComponent;
	@ContentChild(ControllerTableContentComponent, { static: true })
	content: ControllerTableContentComponent;
	@ContentChild(ControllerTableQuickFiltersComponent, { static: true })
	quickFilters: ControllerTableQuickFiltersComponent;

	searchControl: FormControl = new FormControl('');
	inputFocus = false;

	constructor(public listSrv: ListPageService<any, any>) {}

}
