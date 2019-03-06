import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '~core/entity-services';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { ExtendedFieldDefinition, Product } from '~core/models';
import { CustomField } from '~shared/dynamic-forms';

@Component({
	selector: 'product-information-app',
	templateUrl: './product-information.component.html',
	styleUrls: ['./product-information.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInformationComponent implements OnInit {


	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{
			name: 'supplier', type: 'selector',
			metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{
			name: 'event', type: 'selector',
			metadata: { target: 'event', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{
			name: 'category', type: 'selector',
			metadata: { target: 'category', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{ name: 'price', type: 'price' },
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'textarea', label: 'MOQ description' }
	];

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		private productSrv: ProductService
	) { }

	ngOnInit() {
		// this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "Product"' });
	}

	updateProduct(product: Product) {
		this.update.emit({ id: this.product.id, ...product });
	}

}
