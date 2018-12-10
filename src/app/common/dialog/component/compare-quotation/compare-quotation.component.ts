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
	selector: 'compare-quotation-app',
	templateUrl: './compare-quotation.component.html',
	styleUrls: ['./compare-quotation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareQuotationComponent extends AutoUnsub
	implements AfterViewInit, OnInit {
	priceMatrixLabels = [];
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
				dataType: 'image',
				data: getArrayData(quotes, 'product.images')
			},
			{
				type: 'header',
				dataType: 'text',
				data: getArrayData(quotes, 'supplier.name')
			},
			{
				type: 'header',
				dataType: 'text',
				title: 'Reference',
				data: getArrayData(quotes, 'reference')
			},
			{
				type: 'content',
				dataType: 'price',
				title: 'Price',
				data: getArrayData(quotes, 'price')
			}, {
				type: 'content',
				dataType: 'text',
				title: 'MOQ',
				data: getArrayData(quotes, 'minimumOrderQuantity')
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'MOQ Description',
				data: getArrayData(quotes, 'moqDescription')
			}, {
				type: 'content',
				dataType: 'text',
				title: 'Sample Price',
				data: getArrayData(quotes, 'samplePrice')
			},
			{
				type: 'title',
				dataType: 'text',
				title: 'PRICE MATRIX'
			},
			//       ...this.priceMatrixLabels.map(priceMatrix => {
			//         return {
			//           type: 'content',
			//           dataType: 'text',
			//           title: priceMatrix,
			//           data: this._getPriceMatrixRowByLabel(quotes, priceMatrix)
			//         };
			//       }),
			{
				type: 'title',
				dataType: 'text',
				title: 'TRADING'
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'Inco Term',
				data: getArrayData(quotes, 'incoTerms')
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'Harbour',
				data: getArrayData(quotes, 'harbour')
			},
			{
				type: 'title',
				dataType: 'text',
				title: 'PACKAGING'
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'Carton Size',
				data: getPackagingString(quotes, 'innerCarton')
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'Master Carton',
				data: getPackagingString(quotes, 'masterCarton')
			},
			{
				type: 'content',
				dataType: 'text',
				title: 'Pcs per Master',
				data: getPackagingString(quotes, 'masterCarton.itemsQuantity')
			}

		];
	}

	get quotes() {
		return this._quotes;
	}

	constructor(private dlgSrv: DialogService) {
		super();
	}

	
	ngOnInit() { }

	ngAfterViewInit() { }

	closeDlg() {
		this.dlgSrv.close();
	}
}
