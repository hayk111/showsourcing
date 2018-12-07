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
	selector: 'compare-quotation-app',
	templateUrl: './compare-quotation.component.html',
	styleUrls: ['./compare-quotation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareQuotationComponent extends AutoUnsub
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
				data: this._getArrayData(products, 'images')
			},
			{
				type: 'header',
				data: this._getArrayData(products, 'name')
			},
			{
				dataType: 'description',
				data: this._getArrayData(products, 'description')
			},
			{
				title: 'Supplier',
				data: this._getArrayData(products, 'supplier.name')
			},
			{
				title: 'Price',
				dataType: 'price',
				data: this._getArrayData(products, 'price')
			},
			{
				title: 'MOQ',
				data: this._getArrayData(products, 'minimumOrderQuantity')
			},
			{
				title: 'MOQ Description',
				data: this._getArrayData(products, 'moqDescription')
			},
			{
				title: 'Team Rating',
				data: this._getArrayData(products, 'score')
			},
			{
				title: 'Category',
				data: this._getArrayData(products, 'category.name')
			},
			{
				title: 'Tags',
				dataType: 'tag',
				data: this._getArrayData(products, 'tags')
			},
			{
				type: 'title',
				title: 'TRADING'
			},
			{
				title: 'Inco Term',
				data: this._getArrayData(products, 'incoTerms')
			},
			{
				title: 'Harbour',
				data: this._getArrayData(products, 'harbour')
			},
			{
				type: 'title',
				title: 'PACKAGING'
			},
			{
				title: 'Carton Size',
				data: this._getPackagingString(products, 'innerCarton')
			},
			{
				title: 'Master Carton',
				data: this._getPackagingString(products, 'masterCarton')
			},
			{
				title: 'Pcs per Master',
				data: this._getPackagingString(products, 'masterCarton.itemsQuantity')
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
