import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/asbtract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-supplier-row-app',
	templateUrl: './selector-supplier-row.component.html',
	styleUrls: ['./selector-supplier-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorSupplierRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() supplier: Supplier;

	constructor() { super(); }

	getLabel() {
		return this.supplier.id;
	}
}
