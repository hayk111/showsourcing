import { Component, Input } from '@angular/core';
import { ProductStatus, SampleStatus, SupplierStatus } from '~models';
import { StatusUtils, StatusCategory } from '~utils';

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

	statusUtils = StatusUtils;

	// we need to pass this so when the
	// status is null, because the product or supplier are new
	// @Input() type: ('list' | 'badge') = 'badge';

	constructor() {
	}

	hasStatus() {
		return this.status && this.status.category !== StatusCategory.NEW;
	}

}
