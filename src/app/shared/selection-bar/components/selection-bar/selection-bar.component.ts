import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~entity-services/_global/select-params';
import { selectionBarAnimation } from '~shared/selection-bar/animation/selection-bar.animation';
import { EntityType } from '~core/models';

@Component({
	selector: 'selection-bar-app',
	templateUrl: './selection-bar.component.html',
	styleUrls: ['./selection-bar.component.scss'],
	// commented because selection isn't currently immutable but it should be
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		selectionBarAnimation
	],
	host: {
		class: 'z-2'
	}
})
export class SelectionBarComponent implements OnInit {
	@Input() selection: Map<string, boolean>;
	@Input() entityType: EntityType;
	@Input() state: 'selectedPartial' | 'unchecked' | 'selectedAll';
	@Input() count: number;
	@Input() isShown = false;
	@Output() close = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	capitalize(txt: string): string | void {
		if (txt && (typeof txt) === 'string') {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		}
	}

}
