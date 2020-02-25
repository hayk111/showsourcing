import { Component, Input } from '@angular/core';
import { ListPageViewService } from '~core/list-page/list-page-view.service';

export type View = 'table' | 'card' | 'board';

@Component({
	selector: 'controller-table-view-switcher-app',
	templateUrl: './controller-table-view-switcher.component.html',
	styleUrls: ['./controller-table-view-switcher.component.scss']
})
export class ControllerTableViewSwitcherComponent {
	@Input() hasTable = true;
	@Input() hasCard = true;
	@Input() hasBoard = true;

	constructor(
		private viewSrv: ListPageViewService<any>
	) {}

	changeView(view: View) {
		this.viewSrv.changeView(view);
	}

	get view() {
		return this.viewSrv.view;
	}
}
