import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ERM } from '~core/erm';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-selection-bar-app',
	templateUrl: './supplier-selection-bar.component.html',
	styleUrls: ['./supplier-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierSelectionBarComponent extends TrackingComponent {

	@Input() favorite: boolean;
	@Input() allSelectedFavorite: boolean;
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() statusUpdated = new EventEmitter<any>();

	erm = ERM;

	constructor() {
		super();
	}

}
