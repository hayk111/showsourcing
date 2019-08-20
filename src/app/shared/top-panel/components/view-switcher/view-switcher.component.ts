import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'view-switcher-app',
	templateUrl: './view-switcher.component.html',
	styleUrls: ['./view-switcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSwitcherComponent implements OnInit {
	_view: 'list' | 'board' | 'card' = 'card';
	@Input()
	set view(view: 'list' | 'board' | 'card') {
		if (view !== 'list' && view !== 'card')
			this._view = 'list';
		else
			this._view = view;
	}
	@Input() switchContent: ['list-menu', 'board' , 'kanban' | 'grid'] = ['list-menu', 'board' , 'grid'];
	@Output() viewChange = new EventEmitter<string>();

	get view() {
		return this._view;
	}

	constructor() { }

	ngOnInit() { }

	switchView(view: 'list' | 'board' | 'card') {
		this.view = view;
		this.viewChange.emit(view);
	}
}
