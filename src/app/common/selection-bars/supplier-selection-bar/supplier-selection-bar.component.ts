import { Component, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { EntitySelectionBarComponent } from '../entity-selection-bar.component';

@Component({
	selector: 'supplier-selection-bar-app',
	templateUrl: './supplier-selection-bar.component.html',
	styleUrls: ['./supplier-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierSelectionBarComponent extends EntitySelectionBarComponent {
	@Input() favorite: boolean;
	@Input() allSelectedFavorite: boolean;
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() statusUpdated = new EventEmitter<any>();

	constructor() {
		super();
	}

}
