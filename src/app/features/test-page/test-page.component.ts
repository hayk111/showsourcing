import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedField, Product, ExtendedFieldDefinition } from '~core/models';
import { ProductService } from '~core/entity-services';
import { ExtendedFieldDefinitionService } from '~core/entity-services/extended-field-definition/extended-field-definition.service';

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPageComponent implements OnInit {

	definitions: Observable<Product>;
	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(private productSrv: ProductService, private exSrv: ExtendedFieldDefinitionService) { }

	ngOnInit() {
		this.fieldDefinitions$ = this.exSrv.queryMany(
			{ query: 'target == "Product.extendedField" OR target == "product.harbour" OR target == "product.incoterm"' }
		);
		this.definitions = this.productSrv.queryOne('47668cbe-e34a-4172-9afa-a549e698dcee');
		this.definitions.subscribe(p => console.log(p));
	}

}
