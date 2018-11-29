import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ERM, Product, AppImage } from '~models';
import { ProductService } from '~global-services';
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

	modalOpen = false;

	constructor(private productSrv: ProductService) { }

	ngOnInit() {
		this.product$ = this.productSrv.selectOne('0cf5af51-a620-4894-89e0-eee79c42f85e');
	}

	/** when image is deleted */
	onDelete(image: AppImage) {
		// 	const images = this.product.images.filter(img => image.id !== img.id);
		// 	this.productSrv.update({ id: this.product.id, images }).subscribe();
	}

	/** opens the modal carousel */
	openModal(index: number) {
		this.modalOpen = true;
	}

	/** closes the modal */
	closeModal() {
		this.modalOpen = false;
	}

	// getSupplierLocation() {
	// 	let locName = '-';
	// 	if (this.entity) {
	// 		if (this.entity.city && this.entity.country)
	// 			locName = this.entity.city + ', ' + this.constPipe.transform(this.entity.country, 'country');
	// 		else if (this.entity.city)
	// 			locName = this.entity.city;
	// 		else
	// 			locName = this.constPipe.transform(this.entity.country, 'country');
	// 	}
	// 	return locName;
	// }

}
