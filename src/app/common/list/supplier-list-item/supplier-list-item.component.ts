import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { Supplier } from '~core/models';

@Component({
	selector: 'supplier-list-item-app',
	templateUrl: './supplier-list-item.component.html',
	styleUrls: ['./supplier-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierListItemComponent extends TrackingComponent {
	@Input() supplier: Supplier;
}
