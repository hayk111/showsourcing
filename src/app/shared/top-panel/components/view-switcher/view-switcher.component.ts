import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'view-switcher-app',
	templateUrl: './view-switcher.component.html',
	styleUrls: ['./view-switcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSwitcherComponent implements OnInit {
	_view: 'list' | 'card' = 'card';
	@Input()
	set view(view: 'list' | 'card') {
		if (view !== 'list' && view !== 'card')
			this._view = 'list';
		else
			this._view = view;
	}
	@Input() switchContent: ['list', 'kanban' | 'thumbs'] = ['list', 'thumbs'];
	@Output() viewChange = new EventEmitter<string>();

	get view() {
		return this._view;
	}

	constructor() { }

	ngOnInit() { }

	switchView(view: 'card' | 'list') {
		this.view = view;
		this.viewChange.emit(view);
	}
}
