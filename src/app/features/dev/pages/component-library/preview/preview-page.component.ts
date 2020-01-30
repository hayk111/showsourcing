import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ERM, Product, AppImage } from '~core/orm/models';
import { ProductService } from '~core/orm/services';
import { Observable } from 'rxjs';

@Component({
	selector: 'preview-page-app',
	templateUrl: './preview-page.component.html',
	styleUrls: ['./preview-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewPageComponent implements OnInit {

	toggle = false;
	selectedIndex = 0;
	erm = ERM;
	entityMD = ERM.PRODUCT;
	product$: Observable<Product>;
	product: Product;

	modalOpen = false;

	constructor(private productSrv: ProductService) { }

	ngOnInit() {
		this.product$ = this.productSrv.selectOne('0cf5af51-a620-4894-89e0-eee79c42f85e');
		this.product$.subscribe(prod => this.product = prod);
	}

	/** when image is deleted */
	onDelete(image: AppImage) {
		// 	const images = this.product.images.filter(img => image.id !== img.id);
		// 	this.productSrv.update({ id: this.product.id, images }).subscribe();
	}

	/** opens the modal carousel */
	openModal(index: number) {
		this.selectedIndex = index;
		this.modalOpen = true;
	}

	/** closes the modal */
	closeModal() {
		this.modalOpen = false;
	}

	update(value: any, prop: string) {
		this.productSrv.update({ id: this.product.id, [prop]: value }).subscribe();
	}

	// getSupplierLocation() {
	// 	let locName = '-';
	// 	if (this.entity) {
	// 		if (this.entity.city && this.entity.country)
	// 			locName = this.entity.city + ', ' + translate(this.entity.country, 'country');
	// 		else if (this.entity.city)
	// 			locName = this.entity.city;
	// 		else
	// 			locName = translate(this.entity.country, 'country');
	// 	}
	// 	return locName;
	// }

}
