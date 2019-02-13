import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, ExtendedFieldDefinition } from '~core/models';
import { Observable } from 'rxjs';
import { ExtendedFieldDefinitionService } from '~core/entity-services/extended-field-definition/extended-field-definition.service';

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

	constructor(private extendedFieldDefSrv: ExtendedFieldDefinitionService) { }

	ngOnInit() {
		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "Product"' });
	}

}
