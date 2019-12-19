import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityType, Entity } from '~core/models';
import { selectionBarAnimation } from '~shared/selection-bar/animation/selection-bar.animation';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';

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
	@Input() selectableItems: Entity[];
	@Input() isShown = false;
	@Output() close = new EventEmitter();
	@Output() selectAll = new EventEmitter<Entity[]>();
	@Output() unselectAll = new EventEmitter();

	capitalize(txt: string): string | void {
		if (txt && (typeof txt) === 'string') {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		}
	}

	getSelectionState(): SelectionState {
		if (this.selection.size === 0) {
			return 'unchecked';
		}
		return this.selection.size === this.selectableItems.length ? 'selectedAll' : 'selectedPartial';
	}

}
