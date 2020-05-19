import { Component, Input } from '@angular/core';
import { ProductStatus, SampleStatus, SupplierStatus } from '~core/erm';
import { StatusUtils } from '~utils';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'status-button-app',
	templateUrl: './status-button.component.html',
	styleUrls: ['./status-button.component.scss'],
})
export class StatusButtonComponent {
	@Input() displayStep = true;
	@Input() displayAttribute: 'name' | 'category' = 'name';
	@Input() status: ProductStatus | SupplierStatus | SampleStatus;
	@Input() size: 'm' | 'l' = 'm';
	// we need to pass this when the status is null, to display "New Typename"
	@Input() typename: Typename;

	statusUtils = StatusUtils;

	constructor() {}
}
