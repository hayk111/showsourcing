import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Supplier } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';
import { StatusUtils } from '~utils';

@Component({
	selector: 'selector-supplier-row-app',
	templateUrl: './selector-supplier-row.component.html',
	styleUrls: ['./selector-supplier-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorSupplierRowComponent extends AbstractSelectorHighlightableComponent {

	private _supplier: Supplier;
	@Input() set supplier(supplier: Supplier) {
		this._supplier = supplier;
		this.color = StatusUtils.getStatusColor(supplier.status);
	}

	get supplier() {
		return this._supplier;
	}

	color = 'secondary';

	constructor() { super(); }

	getLabel() {
		return this.supplier;
	}

	getItem() {
		return this.supplier;
	}

	getType(status) {
		// by default is secondary since is the color for NEW elements
		let style = 'secondary';
		if (status) {
			switch (status.category) {
				case 'inProgress':
					style = 'in-progress';
					break;
				case 'validated':
					style = 'success';
					break;
				case 'refused':
					style = 'warn';
					break;
				case 'inspiration':
					style = 'secondary-light';
					break;
				default:
					style = 'secondary';
					break;
			}
		}
		return style;
	}

	trackByC(category) {
		return category.id;
	}
}
