import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';
import { selectionBarAnimation } from '~shared/selection-bar/animation/selection-bar.animation';
import { SelectionService, ListHelperService } from '~core/list-page2';
import { Typename } from '~core/erm3/typename.type';
import { Entity } from '~core/erm3/models/_entity.model';

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
	@Input() typename: Typename; // ? do we need typename ?
	@Input() selectableItems: Entity[];
	@Input() isShown = false;
	@Output() close = new EventEmitter();
	@Output() selectAll = new EventEmitter<Entity[]>();
	@Output() unselectAll = new EventEmitter();

	constructor(public selectionSrv: SelectionService, public listHelper: ListHelperService) {
	}

	test() {
		this.listHelper.filteredItems$.subscribe(data => console.log(data));
	}

	getSelectionState(): SelectionState {
		if (this.selection.size === 0 || !this.selectableItems) {
			return 'unchecked';
		}

		return this.selection.size === this.selectableItems.length ? 'selectedAll' : 'selectedPartial';
	}

}
