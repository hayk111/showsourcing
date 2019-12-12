import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListPageService } from '~core/list-page';

export type View = 'table' | 'cards' | 'kanban';


@Component({
	selector: 'controller-list-view-switcher-app',
	templateUrl: './controller-list-view-switcher.component.html',
	styleUrls: ['./controller-list-view-switcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControllerListViewSwitcherComponent {
	@Input() switchContent: View[] = ['table', 'cards' , 'kanban'];
	@Output() viewChange = new EventEmitter<string>();

	constructor(public listSrv: ListPageService<any, any>) {}

	get view() {
		return this.listSrv.view;
	}

	set view(view: View) {
		this.viewChange.emit(view);
		this.listSrv.changeView(view);
	}
}
