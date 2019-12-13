import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListPageService } from '~core/list-page';


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
	/** describes the layout of the controller-list */
	@Input() hasFilters = true;

	searchControl: FormControl = new FormControl('');
	inputFocus = false;

	constructor(public listSrv: ListPageService<any, any>) {}

}
