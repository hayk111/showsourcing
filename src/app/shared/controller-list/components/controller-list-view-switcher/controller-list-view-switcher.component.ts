import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type View = 'table' | 'card' | 'board';


@Component({
	selector: 'controller-list-view-switcher-app',
	templateUrl: './controller-list-view-switcher.component.html',
	styleUrls: ['./controller-list-view-switcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControllerListViewSwitcherComponent {
	@Input() switchContent: View[] = ['table', 'card' , 'board'];
	@Input() view: View;
	@Output() viewChange = new EventEmitter<string>();

	changeView(view: View) {
		this.viewChange.emit(view);
	}
}
