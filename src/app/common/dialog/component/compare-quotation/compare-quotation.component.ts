import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
} from '@angular/core';
import { Contact, Product, Quote } from '~models';
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
	public comparisonDataModels: ComparisonDataModel[] = [];

	private _quotes: Quote[] = [];
	@Input()
	set quotes(quotes: Quote[]) {
		this._quotes = quotes;
		this.priceMatrixLabels = this._quotes
			.map(x => x.priceMatrix.rows.map(row => row.label))
			.reduce((acc, val) => acc.concat(val), [])
			.filter((el, i, a) => i === a.indexOf(el));
		this.comparisonDataModels = [
			{
				title: 'Reference',
				data: this._getArrayData(quotes, 'reference')
			}, {
				title: 'Price',
				dataType: 'price',
				data: this._getArrayData(quotes, 'price')
			}, {
				title: 'MOQ',
				data: this._getArrayData(quotes, 'minimumOrderQuantity')
			}, {
				title: 'MOQ Description',
				data: this._getArrayData(quotes, 'moqDescription')
			}, {
				title: 'Sample Price',
				data: this._getArrayData(quotes, 'samplePrice')
			}, {
				type: 'title',
				title: 'PRICE MATRIX'
			}, ...this.priceMatrixLabels.map(priceMatrix => {
				return {
					title: priceMatrix,
					data: this._getArrayData(quotes, 'samplePrice')
				}
			})
			,
			{
				title: 'Reference',
				data: this._getArrayData(quotes, 'reference')
			}, {
				title: 'Reference',
				data: this._getArrayData(quotes, 'reference')
			}, {
				title: 'Reference',
				data: this._getArrayData(quotes, 'reference')
			}, {
				title: 'Reference',
				data: this._getArrayData(quotes, 'reference')
			}, {
				title: 'Reference',
				data: this._getArrayData(quotes, 'reference')
			}, {
				title: 'Reference',
				data: this._getArrayData(quotes, 'reference')
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
		return array.map(x => (x[property] || '-'));
	}

	private _getPriceMatrixRowByLabel(array: Array<any>, _label: string): Array<any> {
		const label = String(_label).toLowerCase();
		const priceMatrix = this.quote.priceMatrix.rows.find(x => String(x.label).toLowerCase() === label);
		return (
			(priceMatrix && priceMatrix.price.value) || '-'
		);
	}

	ngOnInit() { }

	ngAfterViewInit() { }

	closeDlg() {
		this.dlgSrv.close();
	}
}
