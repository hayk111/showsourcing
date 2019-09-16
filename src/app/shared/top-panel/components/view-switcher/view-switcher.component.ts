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
		if (view !== 'list' && view !== 'board' && view !== 'card') {
			this._view = 'list';
		} else {
			this._view = view;
		}
	}
	/** whether there's thumb switch */
	@Input() hasThumb = true;

	@Input() switchContent: ['list', 'board', 'kanban' | 'thumbs'] = ['list', 'board' , 'thumbs'];
	@Output() viewChange = new EventEmitter<string>();

	get view() {
		return this._view;
	}

	constructor() { }

	ngOnInit() { }

	switchView(view: 'card' | 'board' | 'list') {
		this.view = view;
		this.viewChange.emit(view);
	}
}
