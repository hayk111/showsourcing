import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity, EntityMetadata } from '~core/erm';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';
import { selectionBarAnimation } from '~shared/selection-bar/animation/selection-bar.animation';

@Component({
	selector: 'selection-bar-app',
	templateUrl: './selection-bar.component.html',
	styleUrls: ['./selection-bar.component.scss'],
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
	@Input() entityMetadata: EntityMetadata;
	@Input() selectableItems: Entity[];
	@Input() isShown = false;
	@Output() close = new EventEmitter();
	@Output() selectAll = new EventEmitter<Entity[]>();
	@Output() unselectAll = new EventEmitter();

	getSelectionState(): SelectionState {
		if (this.selection.size === 0 || !this.selectableItems) {
			return 'unchecked';
		}

		return this.selection.size === this.selectableItems.length ? 'selectedAll' : 'selectedPartial';
	}

}
