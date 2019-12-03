import { Component, Input } from '@angular/core';
import { ProductStatus, SampleStatus, SupplierStatus } from '~models';
import { StatusUtils } from '~utils';

@Component({
	selector: 'status-box-app',
	templateUrl: './status-box.component.html',
	styleUrls: ['./status-box.component.scss']
})
export class StatusBoxComponent {

	@Input() displayAttribute: 'name' | 'category' = 'name';
	@Input() status: ProductStatus | SupplierStatus | SampleStatus;

	statusUtils = StatusUtils;

	constructor() {
	}

}
