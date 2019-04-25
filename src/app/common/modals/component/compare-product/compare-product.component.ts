import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product, ERM } from '~models';
import { DialogService } from '~shared/dialog/services';
import { ComparisonDataModel } from '~shared/table/models/';
import { AutoUnsub, translate } from '~utils';
import { getArrayData, getPackagingString } from '~utils/product.utils';

@Component({
	selector: 'compare-product-app',
	templateUrl: './compare-product.component.html',
	styleUrls: ['./compare-product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareProductComponent extends AutoUnsub {
	priceMatrixLabels = [];
	public comparisonData: ComparisonDataModel[] = [];

	private _products: Product[] = [];
	@Input()
	set products(products: Product[]) {
		this._products = products;
		this.comparisonData = [
			{
				type: 'header',
				dataType: 'image',
				data: getArrayData(this.products, 'images')
			},
			{
				type: 'header',
				dataType: 'text',
				data: getArrayData(this.products, 'name')
			},
			{
				type: 'header',
				dataType: 'description',
				data: getArrayData(this.products, 'description')
			},
			{
				type: 'content',
				title: translate(ERM.SUPPLIER.singular, 'erm'),
				dataType: 'text',
				data: getArrayData(this.products, 'supplier.name')
			},
			{
				title: translate(ERM.PRICE.singular, 'erm'),
				type: 'content',
				dataType: 'price',
				data: getArrayData(this.products, 'price')
			},
			{
				type: 'content',
				title: translate('MOQ'),
				dataType: 'text',
				data: getArrayData(this.products, 'minimumOrderQuantity')
			},
			{
				type: 'content',
				dataType: 'text',
				title: translate('MOQ Description'),
				data: getArrayData(this.products, 'moqDescription')
			},
			{
				type: 'content',
				title: translate('Team Rating'),
				dataType: 'text',
				data: getArrayData(this.products, 'score')
			},
			{
				type: 'content',
				title: translate(ERM.CATEGORY.singular, 'erm'),
				dataType: 'text',
				data: getArrayData(this.products, 'category.name')
			},
			{
				type: 'content',
				title: translate(ERM.TAG.singular, 'erm'),
				dataType: 'tag',
				data: getArrayData(this.products, 'tags')
			},
			{
				type: 'title',
				dataType: 'text',
				title: translate('packaging')
			},
			{
				type: 'content',
				title: translate('carton size'),
				dataType: 'text',
				data: getPackagingString(this.products, 'innerCarton')
			},
			{
				type: 'content',
				title: translate('master carton'),
				dataType: 'text',
				data: getPackagingString(this.products, 'masterCarton')
			},
			{
				type: 'content',
				title: translate('pcs per master'),
				dataType: 'text',
				data: getPackagingString(this.products, 'masterCarton.itemsQuantity')
			},
			{
				type: 'title',
				dataType: 'text',
				title: translate('trading')
			},
			{
				type: 'content',
				title: translate(ERM.INCOTERM.singular, 'erm'),
				dataType: 'text',
				data: getArrayData(this.products, 'incoTerms')
			},
			{
				type: 'content',
				title: translate(ERM.HARBOUR.singular, 'erm'),
				dataType: 'text',
				data: getArrayData(this.products, 'harbour')
			},
			// { // we comment this since this is for the status, when we updated it we dont get the live version
			// so we will be forced to do a selectMany, here, to avoid this we comment it. we keep it just in case it is needed for some reason
			// 	type: 'status',
			// 	dataType: 'status',
			// 	data: this.products
			// }
		];
	}

	get products() {
		return this._products;
	}

	constructor(
		private dlgSrv: DialogService) {
		super();
	}

	closeDlg() {
		this.dlgSrv.close();
	}
}
