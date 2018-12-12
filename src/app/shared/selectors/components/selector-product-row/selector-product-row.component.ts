import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-product-row-app',
	templateUrl: './selector-product-row.component.html',
	styleUrls: ['./selector-product-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorProductRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() product: Product;

	constructor() { super(); }

	getLabel() {
		return this.product.id;
	}

}
