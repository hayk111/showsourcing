import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '~models';
import { DialogService } from '~shared/dialog/services';
import { ComparisonDataModel } from '~shared/table/models/';
import { AutoUnsub } from '~utils';
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
				title: 'Supplier',
				dataType: 'text',
				data: getArrayData(this.products, 'supplier.name')
			},
			{
				title: 'Price',
				type: 'content',
				dataType: 'price',
				data: getArrayData(this.products, 'price')
			},
			{
				type: 'content',
				title: 'MOQ',
				dataType: 'text',
				data: getArrayData(this.products, 'minimumOrderQuantity')
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'MOQ Description',
				data: getArrayData(this.products, 'moqDescription')
			},
			{
				type: 'content',
				title: 'Team Rating',
				dataType: 'text',
				data: getArrayData(this.products, 'score')
			},
			{
				type: 'content',
				title: 'Category',
				dataType: 'text',
				data: getArrayData(this.products, 'category.name')
			},
			{
				type: 'content',
				title: 'Tags',
				dataType: 'tag',
				data: getArrayData(this.products, 'tags')
			},
			{
				type: 'title',
				dataType: 'text',
				title: 'TRADING'
			},
			{
				type: 'content',
				title: 'Inco Term',
				dataType: 'text',
				data: getArrayData(this.products, 'incoTerms')
			},
			{
				type: 'content',
				title: 'Harbour',
				dataType: 'text',
				data: getArrayData(this.products, 'harbour')
			},
			{
				type: 'title',
				dataType: 'text',
				title: 'PACKAGING'
			},
			{
				type: 'content',
				title: 'Carton Size',
				dataType: 'text',
				data: getPackagingString(this.products, 'innerCarton')
			},
			{
				type: 'content',
				title: 'Master Carton',
				dataType: 'text',
				data: getPackagingString(this.products, 'masterCarton')
			},
			{
				type: 'content',
				title: 'Pcs per Master',
				dataType: 'text',
				data: getPackagingString(this.products, 'masterCarton.itemsQuantity')
			},
			// { // we comment this since this is for the status, when we updated it we dont get the live version
			// so we will be forced to do a selectMany, here, to avoid this we comment it. we keep it just in case it is needed for some reason
			// 	type: 'header',
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
