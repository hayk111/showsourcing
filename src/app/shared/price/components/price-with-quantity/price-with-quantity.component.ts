import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Price, Product } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import {
	RestrictInputDirective
} from '~shared/inputs/components-directives';

@Component({
	selector: 'price-with-quantity-app',
	templateUrl: './price-with-quantity.component.html',
	styleUrls: ['./price-with-quantity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [RestrictInputDirective]
})
export class PriceWithQuantityComponent extends TrackingComponent {

	@Input() product: Product;

	@Output() closed = new EventEmitter();
	@Output() updateField = new EventEmitter<{
		field: any,
		newValue: any
	}>();

	constructor() {
		super();
	}

	updateProductField(isCancel: boolean, newValue: any, field: string) {
		if (!isCancel && this.updateField) {
			this.updateField.emit({
				field: field,
				newValue: newValue
			});
		}
	}
}
