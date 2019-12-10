import { Component, Input } from '@angular/core';
import { ProductStatus, SampleStatus, SupplierStatus } from '~models';
import { StatusUtils } from '~utils';

@Component({
	selector: 'status-button-app',
	templateUrl: './status-button.component.html',
	styleUrls: ['./status-button.component.scss']
})
export class StatusButtonComponent {

	@Input() displayAttribute: 'name' | 'category' = 'name';
	@Input() status: ProductStatus | SupplierStatus | SampleStatus;

	statusUtils = StatusUtils;

	constructor() {
	}

}