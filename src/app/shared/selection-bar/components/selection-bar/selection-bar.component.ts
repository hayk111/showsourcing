import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';
import { selectionBarAnimation } from '~shared/selection-bar/animation/selection-bar.animation';
import { SelectionService, ListHelperService } from '~core/list-page2';
import { Typename } from '~core/erm3/typename.type';
import { map } from 'rxjs/operators';

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
	@Input() typename: Typename;
	isShown$ = this.selectionSrv.selection$.pipe(map(selection => !!selection.size));

	constructor(public selectionSrv: SelectionService, public listHelper: ListHelperService) {
	}

	async selectAllItems() {
		const allItems = await this.listHelper.filteredItems$.toPromise();
		this.selectionSrv.selectAll(allItems.map(item => item.id));
	}

	getSelectionState(): SelectionState {
		if (this.selectionSrv.selection.size === 0)
			return 'unchecked';
		return this.selectionSrv.selection.size === this.listHelper.total ? 'selectedAll' : 'selectedPartial';
	}

}
