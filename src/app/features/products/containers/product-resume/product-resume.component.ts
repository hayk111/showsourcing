import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductService } from '~core/entity-services';
import { ERM, Product } from '~core/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-resume-app',
	templateUrl: './product-resume.component.html',
	styleUrls: ['./product-resume.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductResumeComponent extends AutoUnsub implements OnInit {

	@Input() product: Product;

	erm = ERM;

	constructor(
		private productSrv: ProductService
	) {
		super();
	}

	ngOnInit() { }

	update(item: any, prop: string) {
		this.productSrv.update({ id: this.product.id, [prop]: item }).subscribe();
	}

}
