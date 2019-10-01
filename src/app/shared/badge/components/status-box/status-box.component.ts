import { Component, Input } from '@angular/core';
import { EntityMetadata, ProductStatus, SampleStatus, SupplierStatus } from '~models';

@Component({
	selector: 'status-box-app',
	templateUrl: './status-box.component.html',
	styleUrls: ['./status-box.component.scss']
})
export class StatusBoxComponent {

	@Input() displayAttribute: 'name' | 'category' = 'name';
	@Input() status: ProductStatus | SupplierStatus | SampleStatus;
	@Input() round = true;
	@Input() width = 200;

	// we need to pass this so when the
	// status is null, because the product or supplier are new
	@Input() typeEntity: EntityMetadata;
	@Input() type: ('list' | 'badge') = 'badge';

	constructor() {
	}

	isHaveStatus() {
		return this.status && this.status.category !== 'new';
	}

	getType() {
		// by default is secondary since is the color for NEW elements
		if (this.status) {
			switch (this.status.category) {
				case 'inProgress':
					return 'in-progress';
				case 'validated':
					return 'validated';
				case 'refused':
					return 'refused';
				case 'inspiration':
					return 'secondary-light';
				default:
					return 'new';
			}
		}
	}

}
