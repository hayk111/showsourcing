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

	private _quotes: Quote[] = [];
	@Input()
	set quotes(quotes: Quote[]) {
		this._quotes = quotes;
		this.priceMatrixLabels = this._quotes
			.map(x => x.priceMatrix.rows.map(row => row.label))
			.reduce((acc, val) => acc.concat(val), [])
			.filter((el, i, a) => i === a.indexOf(el));
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
