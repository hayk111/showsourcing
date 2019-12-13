import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListPageService } from '~core/list-page';


export type Panel = 'search' | 'filters' | 'actions' | 'quick-filters' | 'view-switcher';

@Component({
	selector: 'controller-list-app',
	templateUrl: './controller-list.component.html',
	styleUrls: ['./controller-list.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexBetween'
	}
})
export class ControllerListComponent {
	/** describes the layout of the controller-list */
	@Input() panels: Panel[]  = ['search', 'filters', 'actions', 'quick-filters', 'view-switcher'];
	@Output() export = new EventEmitter<undefined>();

	searchControl: FormControl = new FormControl('');
	inputFocus = false;

	constructor(public listSrv: ListPageService<any, any>) {}

}
