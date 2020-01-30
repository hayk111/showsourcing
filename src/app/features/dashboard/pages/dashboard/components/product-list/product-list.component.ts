import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '~core/erm/services';
import { RatingService } from '~shared/rating/services/rating.service';
import { Product, EntityName } from '~core/erm/models';
import { Router } from '@angular/router';

@Component({
	selector: 'product-list-app',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
	@Input() products: Observable<Product[]>;

	constructor(
		private router: Router,
		private productSrv: ProductService,
	) {}

	ngOnInit() {}


	updateProduct(product: Product) {
		this.productSrv.update(product).subscribe();
	}

	navigateToProducts() {
		this.router.navigate(['products']);
	}

}
