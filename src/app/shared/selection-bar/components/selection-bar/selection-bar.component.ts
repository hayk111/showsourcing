import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityType } from '~core/models';
import { selectionBarAnimation } from '~shared/selection-bar/animation/selection-bar.animation';

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
export class SelectionBarComponent {
	@Input() selection: Map<string, boolean>;
	@Input() entityType: EntityType;
	@Input() state: 'selectedPartial' | 'unchecked' | 'selectedAll';
	@Input() count: number;
	@Input() isShown = false;
	@Output() close = new EventEmitter();

	capitalize(txt: string): string | void {
		if (txt && (typeof txt) === 'string') {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		}
	}

}
