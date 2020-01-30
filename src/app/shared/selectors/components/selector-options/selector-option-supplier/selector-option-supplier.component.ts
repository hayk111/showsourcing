import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Supplier } from '~core/orm/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';
import { StatusUtils } from '~utils';

@Component({
	selector: 'selector-option-supplier-app',
	templateUrl: './selector-option-supplier.component.html',
	styleUrls: ['./selector-option-supplier.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionSupplierComponent extends AbstractSelectorHighlightableComponent {

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
