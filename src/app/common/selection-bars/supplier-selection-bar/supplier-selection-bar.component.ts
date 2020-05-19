import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-selection-bar-app',
	templateUrl: './supplier-selection-bar.component.html',
	styleUrls: ['./supplier-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierSelectionBarComponent extends TrackingComponent {
	@Output() deleteSelected = new EventEmitter();

	constructor() {
		super();
	}
}
