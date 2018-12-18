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
import { ConstPipe } from '~shared/utils/pipes/const.pipe';

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
		this._products = [...products, ...products, ...products];
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
			}, {
				type: 'header',
				dataType: 'button',
				data: getArrayData(this.products, 'status.name').map(x => {
					return this.constPipe.transform(x, 'status');
				})
			}
		];
	}

	get products() {
		return this._products;
	}

	constructor(
		private dlgSrv: DialogService,
		private constPipe: ConstPipe) {
		super();
	}

	ngOnInit() {}

	ngAfterViewInit() {}

	closeDlg() {
		this.dlgSrv.close();
	}
}
