import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '~core/entity-services';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { ERM, ExtendedFieldDefinition, Product } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';
import { translate } from '~utils';

@Component({
	selector: 'product-information-app',
	templateUrl: './product-information.component.html',
	styleUrls: ['./product-information.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInformationComponent implements OnInit {


	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();

	customFields: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{
			name: 'supplier', type: 'selector', label: translate(ERM.SUPPLIER.singular, 'erm'),
			metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{
			name: 'event', type: 'selector', label: translate(ERM.EVENT.singular, 'erm'),
			metadata: { target: 'event', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{
			name: 'category', type: 'selector', label: translate(ERM.CATEGORY.singular, 'erm'),
			metadata: { target: 'category', type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{ name: 'price', type: 'price', label: translate(ERM.PRICE.singular, 'erm'), },
		{ name: 'minimumOrderQuantity', type: 'number', label: translate('MOQ') },
		{ name: 'moqDescription', type: 'textarea', label: translate('MOQ description') }
	];

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		private productSrv: ProductService
	) { }

	ngOnInit() {
		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "Product.extendedFields"' });
	}

	updateProduct(product: Product) {
		this.update.emit({ id: this.product.id, ...product });
	}

}
