import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~core/models';
import { CustomField } from '~shared/dynamic-forms';

@Component({
	selector: 'product-information-app',
	templateUrl: './product-information.component.html',
	styleUrls: ['./product-information.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInformationComponent implements OnInit {


	@Input() product: Product;
	customFields: CustomField[] = [
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{
			name: 'supplier', type: 'selector',
			metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{
			name: 'category', type: 'selector',
			metadata: { target: 'category', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{ name: 'price', type: 'price' },
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'textarea', label: 'MOQ description' }
	];
	@Output() update = new EventEmitter<Product>();

	constructor() { }

	ngOnInit() {
	}

}
