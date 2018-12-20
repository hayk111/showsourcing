import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SupplierType } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-supplier-type-row-app',
	templateUrl: './selector-supplier-type-row.component.html',
	styleUrls: ['./selector-supplier-type-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorSupplierTypeRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() supplierType: SupplierType;

	constructor() { super(); }

	getLabel() {
		return this.supplierType;
	}

}
