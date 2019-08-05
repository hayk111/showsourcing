import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductService } from '~core/entity-services';
import { AppImage, Attachment, ERM, ExtendedField, Packaging, Price, Product } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { DynamicField } from '~shared/dynamic-forms';
import { NotificationService, NotificationType } from '~shared/notifications';
import { translate, uuid } from '~utils';

@Component({
	selector: 'creation-product-dlg-app',
	templateUrl: './creation-product-dlg.component.html',
	styleUrls: ['./creation-product-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreationProductDlgComponent implements OnInit {

	@Input() product: Product;
	@Input() createAnother = false;

	// TODO i18n
	dynamicFields: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{
			name: 'supplier',
			type: 'selector',
			label: translate(ERM.SUPPLIER.singular, 'erm'),
			metadata: {
				target: ERM.SUPPLIER.singular,
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{ name: 'price', type: 'price', label: translate(ERM.PRICE.singular, 'erm') },
		{
			name: 'category',
			type: 'selector',
			label: translate(ERM.CATEGORY.singular, 'erm'),
			metadata: {
				target: ERM.CATEGORY.singular,
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: translate('MOQ') },
		{ name: 'moqDescription', type: 'textarea', label: translate('MOQ description') },
		{
			name: 'tags',
			type: 'selector',
			label: translate(ERM.TAG.plural, 'erm'),
			metadata: {
				target: ERM.TAG.singular,
				multiple: true,
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{
			name: 'projects',
			type: 'selector',
			label: translate(ERM.PROJECT.plural, 'erm'),
			metadata: {
				target: ERM.PROJECT.singular,
				multiple: true,
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{ name: 'sample', type: 'boolean', label: translate('sample available') },
		{ name: 'samplePrice', type: 'price', label: translate('sample price') },
		{ name: 'trading information', type: 'title' },
		{ name: 'innerCarton', type: 'packaging', label: translate('inner carton') },
		{ name: 'masterCarton', type: 'packaging', label: translate('master carton') },
		{ name: 'masterCbm', type: 'decimal', label: 'Master Carton CBM' },
		{ name: 'quantityPer20ft', type: 'number', label: `Quantity per 20'` },
		{ name: 'quantityPer40ft', type: 'number', label: `Quantity per 40'` },
		{ name: 'quantityPer40ftHC', type: 'number', label: `Quantity per 40' HC` },
		{
			name: 'incoTerm', type: 'selector', label: translate(ERM.INCO_TERM.singular, 'erm'),
			metadata: {
				target: ERM.INCO_TERM.singular,
				canCreate: false,
				multiple: false,
				labelName: 'name',
				type: 'const',
			}
		},
		{
			name: 'harbour', type: 'selector', label: translate(ERM.HARBOUR.singular, 'erm'),
			metadata: {
				target: ERM.HARBOUR.singular,
				canCreate: false,
				multiple: false,
				width: 495
			}
		},
		{
			name: 'extendedFields', type: 'extendedField', label: 'extended fields',
			metadata: { target: 'Product' }
		}
	];

	constructor(
		private dlgSrv: DialogService,
		private productSrv: ProductService,
		private notifSrv: NotificationService
	) { }

	ngOnInit() {
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
					this.productSrv.onUpdateProductList();
				} else
					this.close();
				// success
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: `Product created`,
					message: 'Your product has been created with success'
				});
			},
				err => {
					this.notifSrv.add({
						type: NotificationType.ERROR,
						title: `Product created`,
						message: 'Your product could not been created'
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
