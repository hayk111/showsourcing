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

	// TODO i18n
	customFields: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{
			name: 'supplier', type: 'selector', label: translate(ERM.SUPPLIER.singular, 'erm'),
			metadata: { target: ERM.SUPPLIER.singular, type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{
			name: 'event', type: 'selector', label: translate(ERM.EVENT.singular, 'erm'),
			metadata: { target: ERM.EVENT.singular, type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{
			name: 'category', type: 'selector', label: translate(ERM.CATEGORY.singular, 'erm'),
			metadata: { target: ERM.CATEGORY.singular, type: 'entity', labelName: 'name', canCreate: true, hideLogo: true }
		},
		{ name: 'price', type: 'price', label: translate(ERM.PRICE.singular, 'erm'), },
		{ name: 'minimumOrderQuantity', type: 'number', label: translate('MOQ') },
		{ name: 'moqDescription', type: 'textarea', label: translate('MOQ description') },
		{ name: 'quantityPer20ft', type: 'number', label: 'Quantity per 20 feet' },
		{ name: 'quantityPer40ft', type: 'number', label: 'Quantity per 40 feet' },
		{ name: 'quantityPer40ftHC', type: 'number', label: 'Quantity per 40 feet HC' },
		{ name: 'masterCbm', type: 'decimal', label: 'Master Carton CBM' },
		{
			name: 'incoTerm', type: 'selector', label: 'inco term',
			metadata: { target: ERM.INCO_TERM.singular, type: 'const', labelName: 'name', canCreate: false, hideLogo: true }
		},
		{
			name: 'harbour', type: 'selector', label: 'harbour',
			metadata: { target: ERM.HARBOUR.singular, type: 'const', labelName: 'name', canCreate: false, hideLogo: true }
		},
	];

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		private productSrv: ProductService
	) { }

	ngOnInit() {
		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryAll(undefined, {
			query: 'target == "Product"',
			sortBy: 'order',
			descending: false
		});
	}

	updateProduct(product: Product) {
		this.update.emit({ id: this.product.id, ...product });
	}

}
