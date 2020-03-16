import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductDescriptor } from '~core/descriptors';
import { ProductService } from '~core/erm';
import { AppImage, Attachment, ExtendedField, Packaging, Price, Product } from '~core/erm';
import { CloseEventType, DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { uuid } from '~utils';

@Component({
	selector: 'creation-product-dlg-app',
	templateUrl: './creation-product-dlg.component.html',
	styleUrls: ['./creation-product-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreationProductDlgComponent implements OnInit {
	@Input() product: Product;
	@Input() createAnother = false;

	productDescriptor: ProductDescriptor;

	constructor(
		private dlgSrv: DialogService,
		private productSrv: ProductService,
		private toastSrv: ToastService,
	) { }

	ngOnInit() {
		this.productDescriptor = new ProductDescriptor([
			'name', 'supplier', 'price', 'category', 'minimumOrderQuantity', 'mowDescription', 'tags',
			'projects', 'sample', 'samplePrice', 'innerCarton', 'masterCarton', 'masterCbm', 'quantityPer20ft',
			'quantityPer40ft', 'quantityPer40ftHC', 'incoTerm', 'harbour', 'extendedFields'
		]);
		this.productDescriptor.insert({ name: 'trading-information', type: 'title' }, 'innerCarton');
		this.productDescriptor.modify([
			{ name: 'supplier', metadata: { width: 495 } },
			{ name: 'category', metadata: { width: 495 } },
			{ name: 'projects', metadata: { width: 495 } },
			{ name: 'tags', metadata: { width: 495 } },
			{ name: 'incoTerm', metadata: { width: 495 } },
			{ name: 'harbour', metadata: { width: 495 } },
		]);

		// if there is not a product created, we create one
		// else if a product exists but it does not have images or attachments initialized
		if (!this.product)
			this.product = new Product({ images: [], attachments: [] });
		else if (!this.product.images || !this.product.attachments)
			this.product = { ...this.product, images: [], attachments: [] };
	}

	updateProduct(product: Product) {
		this.product = { ...this.product, ...product };
	}

	imagesCreated(createdImages: AppImage[]) {
		const images = [...this.product.images, ...createdImages];
		this.product = { ...this.product, images };
	}

	imageDeleted(image: AppImage) {
		const images = this.product.images.filter(img => img.id !== image.id);
		this.product = { ...this.product, images };
	}

	filesCreated(createdFiles: Attachment[]) {
		const attachments = [...this.product.attachments, ...createdFiles];
		this.product = { ...this.product, attachments };
	}

	fileDeleted(file: Attachment) {
		const attachments = this.product.attachments.filter(fl => fl.id !== file.id);
		this.product = { ...this.product, attachments };
	}

	cancel() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.OK, data: { product: this.product } });
	}

	save() {
		if (this.product && this.product.name) {
			this.productSrv.create(this.product).subscribe(product => {
				// if we create a new product we create a new id
				if (this.createAnother) {
					product = this.resetIds(product);
					this.dlgSrv.open(CreationProductDlgComponent, { product, createAnother: true });
				} else {
					this.close();
				}
				// success
				this.toastSrv.add({
					type: ToastType.SUCCESS,
					title: 'title.product-created',
					message: 'message.product-created-with-success'
				});
			},
				err => {
					this.toastSrv.add({
						type: ToastType.ERROR,
						title: 'title.product-not-created',
						message: 'message.your-product-not-created'
					});
				});
		}
	}

	// we keep the same old values, but we reset the ids that cannot be the same as before
	private resetIds(product) {
		product = { ...product, id: uuid(), name: null };
		// master carton
		if (product.masterCarton)
			product = { ...product, masterCarton: new Packaging(product.masterCarton) };
		// inner carton
		if (product.innerCarton)
			product = { ...product, innerCarton: new Packaging(product.innerCarton) };
		// price
		if (product.price)
			product = { ...product, price: new Price(product.price) };
		// smaple price
		if (product.samplePrice)
			product = { ...product, samplePrice: new Price(product.samplePrice) };
		// images
		if (product.images) {
			product = { ...product, images: [] };
		}
		// attachments
		if (product.attachments) {
			product = { ...product, attachments: [] };
		}
		// extendedfields
		if (product.extendedFields) {
			const extendedFields = product.extendedFields.map(field => new ExtendedField(field));
			product = { ...product, extendedFields };
		}
		return product;
	}

}
