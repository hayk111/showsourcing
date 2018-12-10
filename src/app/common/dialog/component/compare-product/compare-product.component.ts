import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
} from '@angular/core';
import { Contact, Product, Quote, Packaging } from '~models';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';
import { ComparisonDataModel } from '~shared/table/models/';
import { getArrayData, getPackagingString } from '~utils/product.utils';

@Component({
	selector: 'compare-product-app',
	templateUrl: './compare-product.component.html',
	styleUrls: ['./compare-product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareProductComponent extends AutoUnsub
	implements AfterViewInit, OnInit {
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
				data: getArrayData(products, 'images')
			},
			{
				type: 'header',
				dataType: 'text',
				data: getArrayData(products, 'name')
			},
			{
				type: 'header',
				dataType: 'description',
				data: getArrayData(products, 'description')
			},
			{
				type: 'content',
				title: 'Supplier',
				dataType: 'text',
				data: getArrayData(products, 'supplier.name')
			},
			{
				title: 'Price',
				type: 'content',
				dataType: 'price',
				data: getArrayData(products, 'price')
			},
			{
				type: 'content',
				title: 'MOQ',
				dataType: 'text',
				data: getArrayData(products, 'minimumOrderQuantity')
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'MOQ Description',
				data: getArrayData(products, 'moqDescription')
			},
			{
				type: 'content',
				title: 'Team Rating',
				dataType: 'text',
				data: getArrayData(products, 'score')
			},
			{
				type: 'content',
				title: 'Category',
				dataType: 'text',
				data: getArrayData(products, 'category.name')
			},
			{
				type: 'content',
				title: 'Tags',
				dataType: 'tag',
				data: getArrayData(products, 'tags')
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
				data: getArrayData(products, 'incoTerms')
			},
			{
				type: 'content',
				title: 'Harbour',
				dataType: 'text',
				data: getArrayData(products, 'harbour')
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
				data: getPackagingString(products, 'innerCarton')
			},
			{
				type: 'content',
				title: 'Master Carton',
				dataType: 'text',
				data: getPackagingString(products, 'masterCarton')
			},
			{
				type: 'content',
				title: 'Pcs per Master',
				dataType: 'text',
				data: getPackagingString(products, 'masterCarton.itemsQuantity')
			}, {
				type: 'header',
				dataType: 'button',
				data: getArrayData(products, 'status.name')
			}
		];
	}

	get products() {
		return this._products;
	}

	constructor(private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {}

	ngAfterViewInit() {}

	closeDlg() {
		this.dlgSrv.close();
	}
}
