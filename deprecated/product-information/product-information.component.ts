import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDescriptor } from '~core/descriptors';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { ExtendedFieldDefinition, Product } from '~core/models';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';


@Component({
	selector: 'product-information-app',
	templateUrl: './product-information.component.html',
	styleUrls: ['./product-information.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInformationComponent implements OnInit {


	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();

	productDescriptor: ProductDescriptor;
	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		public dlgCommonSrv: DialogCommonService
	) { }

	ngOnInit() {
		this.productDescriptor = new ProductDescriptor([
			'name', 'supplier', 'event', 'category', 'price', 'minimumOrderQuantity', 'moqDescription',
			'quantityPer20ft', 'quantityPer40ft', 'quantityPer40ftHC', 'masterCbm', 'incoTerm', 'harbour'
		]);
		this.productDescriptor.modify([
			{ name: 'category', metadata: { hasBadge: false } },
			{ name: 'event', metadata: { hasBadge: false } },
			{ name: 'harbour', metadata: { hasBadge: false } },
			{ name: 'incoTerm', metadata: { hasBadge: false } },
			{ name: 'supplier', metadata: { hasBadge: false } },
		]);

		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "Product"', sortBy: 'order' });
	}

	updateProduct(product: Product) {
		this.update.emit({ id: this.product.id, ...product });
	}

}
