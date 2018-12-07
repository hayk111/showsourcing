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
import { ComparisonDataModel } from './ComparisonDataModel';

@Component({
	selector: 'compare-quotation-app',
	templateUrl: './compare-quotation.component.html',
	styleUrls: ['./compare-quotation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareQuotationComponent extends AutoUnsub
	implements AfterViewInit, OnInit {
	priceMatrixLabels = [];
	@Input() products: Product[] = [];
	public comparisonData: ComparisonDataModel[] = [];

	private _quotes: Quote[] = [];
	@Input()
	set quotes(quotes: Quote[]) {
		this._quotes = quotes;
		this.priceMatrixLabels = this._quotes
			.map(x => x.priceMatrix.rows.map(row => row.label))
			.reduce((acc, val) => acc.concat(val), [])
			.filter((el, i, a) => i === a.indexOf(el));
		this.comparisonData = [
			{
				type: 'header',
				data: this._getArrayData(quotes, 'product.images')
			},
			{
				type: 'header',
				data: this._getArrayData(quotes, 'supplier.name')
			},
			{
				title: 'Reference',
				data: this._getArrayData(quotes, 'reference')
			},
			{
				title: 'Price',
				dataType: 'price',
				data: this._getArrayData(quotes, 'price')
			},
			{
				title: 'MOQ',
				data: this._getArrayData(quotes, 'minimumOrderQuantity')
			},
			{
				title: 'MOQ Description',
				data: this._getArrayData(quotes, 'moqDescription')
			},
			{
				title: 'Sample Price',
				data: this._getArrayData(quotes, 'samplePrice')
			},
			{
				type: 'title',
				title: 'PRICE MATRIX'
			},
			...this.priceMatrixLabels.map(priceMatrix => {
				return {
					title: priceMatrix,
					data: this._getPriceMatrixRowByLabel(quotes, priceMatrix)
				};
			}),
			{
				type: 'title',
				title: 'TRADING'
			},
			{
				title: 'Inco Term',
				data: this._getArrayData(quotes, 'incoTerms')
			},
			{
				title: 'Harbour',
				data: this._getArrayData(quotes, 'harbour')
			},
			{
				type: 'title',
				title: 'PACKAGING'
			},
			{
				title: 'Carton Size',
				data: this._getPackagingString(quotes, 'innerCarton')
			},
			{
				title: 'Master Carton',
				data: this._getPackagingString(quotes, 'masterCarton')
			},
			{
				title: 'Pcs per Master',
				data: this._getPackagingString(quotes, 'masterCarton.itemsQuantity')
			}
		];
	}

	get quotes() {
		return this._quotes;
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
