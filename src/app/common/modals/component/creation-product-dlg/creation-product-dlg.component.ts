import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product, ERM } from '~core/models';
import { DialogService } from '~shared/dialog';
import { DynamicField } from '~shared/dynamic-forms';
import { translate } from '~utils';

@Component({
	selector: 'creation-product-dlg-app',
	templateUrl: './creation-product-dlg.component.html',
	styleUrls: ['./creation-product-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreationProductDlgComponent implements OnInit {

	@Input() product: Product;

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
				canCreate: true
			}
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: translate('MOQ') },
		{ name: 'moqDescription', type: 'textarea', label: translate('MOQ description') },
		{
			name: 'tags',
			type: 'selector',
			label: translate(ERM.TAG.plural, 'erm'),
			metadata: {
				target: ERM.TAG.plural,
				type: 'entity',
				labelName: 'name',
				multiple: true,
				canCreate: true
			}
		},
		{
			name: 'projects',
			type: 'selector',
			label: translate(ERM.PROJECT.plural, 'erm'),
			metadata: {
				target: ERM.PROJECT.plural,
				type: 'entity',
				labelName: 'name',
				multiple: true,
				canCreate: true
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
			metadata: { target: ERM.INCOTERM.singular, canCreate: false, multiple: false, labelName: 'name', type: 'const' }
		},
		{
			name: 'harbour', type: 'selector', label: 'Harbour',
			metadata: { target: ERM.HARBOUR.singular, canCreate: false, multiple: false, labelName: 'name', type: 'const' }
		},
	];

	// map with all the values needed

	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
		if (!this.product)
			this.product = new Product();
	}

	updateProduct(product: Product) {
		// retourne un objet { name: value }
		console.log(product);
	}

}
