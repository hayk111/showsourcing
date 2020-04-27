import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '~core/erm';
import { RatingService } from '~shared/rating/services/rating.service';
import { Product } from '~core/erm';
import { Router } from '@angular/router';

@Component({
	selector: 'latest-products-app',
	templateUrl: './latest-products.component.html',
	styleUrls: ['./latest-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestProductsComponent implements OnInit {
	previewOpen = false;
	productPreview: Product;

	@Input() latestProducts: Observable<Product[]>;

	constructor(
		private router: Router,
		private productSrv: ProductService,
		private ratingSrv: RatingService
	) {}

	ngOnInit() {}

	onThumbUp(product) {
		throw new Error('Not implemented yet');
	}

	onThumbDown(product) {
		throw new Error('Not implemented yet');
	}

	openProductPreview(product: Product) {
		this.previewOpen = true;
		this.productPreview = product;
	}

	closeProductPreview() {
		this.previewOpen = false;
	}

	navigateToProducts() {
		this.router.navigate(['products']);
	}

	viewProduct(product: Product) {
		this.router.navigate(['products', product.id]);
	}

	updateProduct(product: Product) {
		this.productSrv.update(product).subscribe();
	}

}
