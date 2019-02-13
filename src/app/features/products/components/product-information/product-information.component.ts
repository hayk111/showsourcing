import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, ExtendedFieldDefinition, ExtendedField } from '~core/models';
import { Observable } from 'rxjs';
import { ExtendedFieldDefinitionService } from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { ProductService } from '~core/entity-services';
import { stringify } from '@angular/core/src/render3/util';

@Component({
	selector: 'product-information-app',
	templateUrl: './product-information.component.html',
	styleUrls: ['./product-information.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInformationComponent implements OnInit {


	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();
	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		private productSrv: ProductService
	) { }

	ngOnInit() {
		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "Product"' });
	}

	updateProduct(extendedFields: ExtendedField[]) {
		this.update.emit({ id: this.product.id, extendedFields });
	}

}
