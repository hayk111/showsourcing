import { Component, Input } from '@angular/core';
import { ListPageService } from '~core/list-page';

export type View = 'table' | 'card' | 'board';


@Component({
	selector: 'controller-table-view-switcher-app',
	templateUrl: './controller-table-view-switcher.component.html',
	styleUrls: ['./controller-table-view-switcher.component.scss'],
})
export class ControllerTableViewSwitcherComponent {
	@Input() switchContent: View[] = ['table', 'card' , 'board'];


	constructor(private listSrv: ListPageService<any, any>) {}

	changeView(view: View) {
		this.listSrv.changeView(view);
	}

	get view() {
		return this.listSrv.view;
	}
}
