import {
	Component,
	OnInit,
	ViewEncapsulation,
	Input,
	ChangeDetectionStrategy,
	HostBinding,
	EventEmitter,
	Output,
} from '@angular/core';

import { Observable } from 'rxjs';

@Component({
	selector: 'view-switcher-app',
	templateUrl: './view-switcher.component.html',
	styleUrls: ['./view-switcher.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSwitcherComponent implements OnInit {
	_view: 'list' | 'card' = 'card';
	@Output() viewChange = new EventEmitter<string>();
	constructor() { }

	ngOnInit() { }

	switchView(view: 'card' | 'list') {
		this.view = view;
		this.viewChange.emit(view);
	}

	@Input()
	set view(view: 'list' | 'card') {
		if (view !== 'list' && view !== 'card')
			this._view = 'list';
		else
			this._view = view;
	}

	get view() {
		return this._view;
	}
}
