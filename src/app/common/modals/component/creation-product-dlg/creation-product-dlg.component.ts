import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductService } from '~core/entity-services';
import { ERM, Product, Packaging, Price, AppImage } from '~core/models';
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

	// TODO i18n
	dynamicFields: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{
			name: 'supplier',
			type: 'selector',
			label: translate(ERM.SUPPLIER.singular, 'erm'),
			metadata: {
				target: ERM.SUPPLIER.singular,
				type: 'entity',
				labelName: 'name',
				canCreate: true
			}
		},
		{ name: 'price', type: 'price', label: translate(ERM.PRICE.singular, 'erm') },
		{
			name: 'category',
			type: 'selector',
			label: translate(ERM.CATEGORY.singular, 'erm'),
			metadata: {
				target: ERM.CATEGORY.singular,
				type: 'entity',
				labelName: 'name',
				canCreate: true,
				hasBadge: true
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
				type: 'entity',
				labelName: 'name',
				multiple: true,
				canCreate: true,
				hasBadge: true
			}
		},
		{
			name: 'projects',
			type: 'selector',
			label: translate(ERM.PROJECT.plural, 'erm'),
			metadata: {
				target: ERM.PROJECT.singular,
				type: 'entity',
				labelName: 'name',
				multiple: true,
				canCreate: true,
				hasBadge: true
			}
		},
		{ name: 'sample', type: 'boolean' },
		{ name: 'samplePrice', type: 'price', label: translate('sample price') },
		{ name: 'trading information', type: 'title' },
		{ name: 'innerCarton', type: 'packaging', label: translate('inner carton') },
		{ name: 'masterCarton', type: 'packaging', label: translate('master carton') },
		{ name: 'masterCbm', type: 'decimal', label: 'Master Carton CBM' },
		{ name: 'quantityPer20ft', type: 'number', label: `Quantity per 20'` },
		{ name: 'quantityPer40ft', type: 'number', label: `Quantity per 40'` },
		{ name: 'quantityPer40ftHC', type: 'number', label: `Quantity per 40' HC` },
		{
			name: 'incoTerm', type: 'selector', label: 'Inco Term',
			metadata: { target: ERM.INCO_TERM.singular, canCreate: false, multiple: false, labelName: 'name', type: 'const' }
		},
		{
			name: 'harbour', type: 'selector', label: 'Harbour',
			metadata: { target: ERM.HARBOUR.singular, canCreate: false, multiple: false, labelName: 'name', type: 'const' }
		},
		{
			name: 'extendedFields', type: 'extendedField', label: 'extended fields',
			metadata: { target: 'product.extendedFields' }
		}
	];
	images: AppImage[] = [];
	createAnother = false;

	constructor(
		private dlgSrv: DialogService,
		private productSrv: ProductService,
		private notifSrv: NotificationService
	) { }

	ngOnInit() {
		if (!this.product)
			this.product = new Product();
	}

	updateProduct(product: Product) {
		this.product = { ...this.product, ...product };
	}

	imageCreated(item) {
		this.images = [...this.images, ...item];
		this.product = { ...this.product, images: this.images };
	}

	cancel() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.OK });
	}

	save() {
		if (this.product && this.product.name) {
			this.productSrv.create(this.product).subscribe(product => {
				// if we create a new product we create a new id
				if (this.createAnother) {
					product = this.resetIds(product);
					this.dlgSrv.open(CreationProductDlgComponent, { product });
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

	private resetIds(product) {
		product = { ...product, id: uuid() };
		if (product.masterCarton)
			product = { ...product, masterCarton: new Packaging(product.masterCarton) };
		if (product.innerCarton)
			product = { ...product, innerCarton: new Packaging(product.innerCarton) };
		if (product.price)
			product = { ...product, price: new Price(product.price) };
		if (product.samplePrice)
			product = { ...product, samplePrice: new Price(product.samplePrice) };
		// images
		// files
		// extendedfields
		if (product.extendedFields)
			// product = { ...product, extendedFields:  }
			return product;
	}

}
