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
import { ComparisonDataModel } from '../compare-quotation/ComparisonDataModel';

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
				data: this._getArrayData(products, 'images')
			},
			{
				type: 'header',
				dataType: 'text',
				data: this._getArrayData(products, 'name')
			},
			{
				type: 'header',
				dataType: 'description',
				data: this._getArrayData(products, 'description')
			},
			{
				type: 'content',
				title: 'Supplier',
				dataType: 'text',
				data: this._getArrayData(products, 'supplier.name')
			},
			{
				title: 'Price',
				type: 'content',
				dataType: 'price',
				data: this._getArrayData(products, 'price')
			},
			{
				type: 'content',
				title: 'MOQ',
				dataType: 'text',
				data: this._getArrayData(products, 'minimumOrderQuantity')
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'MOQ Description',
				data: this._getArrayData(products, 'moqDescription')
			},
			{
				type: 'content',
				title: 'Team Rating',
				dataType: 'text',
				data: this._getArrayData(products, 'score')
			},
			{
				type: 'content',
				title: 'Category',
				dataType: 'text',
				data: this._getArrayData(products, 'category.name')
			},
			{
				type: 'content',
				title: 'Tags',
				dataType: 'tag',
				data: this._getArrayData(products, 'tags')
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
				data: this._getArrayData(products, 'incoTerms')
			},
			{
				type: 'content',
				title: 'Harbour',
				dataType: 'text',
				data: this._getArrayData(products, 'harbour')
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
				data: this._getPackagingString(products, 'innerCarton')
			},
			{
				type: 'content',
				title: 'Master Carton',
				dataType: 'text',
				data: this._getPackagingString(products, 'masterCarton')
			},
			{
				type: 'content',
				title: 'Pcs per Master',
				dataType: 'text',
				data: this._getPackagingString(products, 'masterCarton.itemsQuantity')
			}, {
				type: 'header',
				dataType: 'button',
				data: this._getArrayData(products, 'status.name')
			}
		];
	}

	get products() {
		return this._products;
	}

	constructor(private dlgSrv: DialogService) {
		super();
	}

	private _getArrayData(array: Array<any>, property: string): Array<any> {
		return array.map(x => this._getNestedValue(x, property) || '-');
	}

	private _getNestedValue(obj: any, property: string) {
		return property.split('.').reduce(function(result, key) {
			if (result) {
				return result[key];
			}
		}, obj);
	}

	private _getPriceMatrixRowByLabel(
		array: Array<any>,
		_label: string
	): Array<any> {
		const label = String(_label).toLowerCase();
		return array.map(quote => {
			const priceMatrix = quote.priceMatrix.rows.find(
				x => String(x.label).toLowerCase() === label
			);
			return (priceMatrix && priceMatrix.price.value) || '-';
		});
	}
	private _getPackagingString(array: Array<any>, property: string): Array<any> {
		return array.map(x => {
			const packaging = x[property];
			if (!packaging) {
				return '';
			}
			return `${packaging.width || 0} x ${packaging.height ||
				0} x ${packaging.depth || 0}${packaging.unit}`;
		});
	}
	ngOnInit() {}

	ngAfterViewInit() {}

	closeDlg() {
		this.dlgSrv.close();
	}
}
