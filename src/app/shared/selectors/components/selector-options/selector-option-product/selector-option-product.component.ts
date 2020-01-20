import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-option-product-app',
	templateUrl: './selector-option-product.component.html',
	styleUrls: ['./selector-option-product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionProductComponent extends AbstractSelectorHighlightableComponent {

	@Input() product: Product;

	constructor() { super(); }

	getLabel() {
		return this.product;
	}

	getItem() {
		return this.product;
	}

}
