import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	NgModuleRef,
	OnInit,
	ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap, take } from 'rxjs/operators';
import { ERM, Product, Quote } from '~models';
import { DialogService } from '~shared/dialog/services';
import { CustomField } from '~shared/dynamic-forms';
import { EditableTextComponent } from '~shared/editable-field';
import { AutoUnsub } from '~utils';
import {
	CompareQuotationComponent,
	RfqDialogComponent
} from '~common/modals';
import {
	ProductFeatureService,
	QuoteFeatureService
} from '~features/products/services';

@Component({
	selector: 'product-quotation-app',
	templateUrl: './product-quotation.component.html',
	styleUrls: ['./product-quotation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductQuotationComponent extends AutoUnsub implements OnInit {
	// whether the form is open
	product$: Observable<Product>;
	product: Product;
	quotes: Quote[] = [];

	constructor(
		private route: ActivatedRoute,
		private srv: ProductFeatureService,
		private dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>,
		protected quotationSrv: QuoteFeatureService,
		private cd: ChangeDetectorRef
	) {
		super();
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.srv.selectOne(params.id)),
			tap(product => this.product = product),
			tap(_ => this.cd.markForCheck())
		);
		this.product$.subscribe(product => {
			this.quotationSrv
				.getQuotationFromProduct(product.id)
				.pipe(take(1))
				.subscribe(_quotes => {
					if (_quotes) {
						this.quotes = _quotes;
						this.cd.markForCheck();
					}
				});
		});
	}

	ngOnInit() {

	}

	openRfq() {
		// we add manually the supplier self email, since it is not on the contacts
		this.dlgSrv.openFromModule(RfqDialogComponent, this.moduleRef, {
			product: this.product
		});
	}

	/** Opens a dialog that lets the user compare quotation of this product */
	openCompareQuotationDialog(quotes) {
		console.log(quotes);
		this.dlgSrv.openFromModule(CompareQuotationComponent, this.moduleRef, {
			quotes: quotes
		});
	}

	loadMoreQuote() {
		// TODO need to implement
		throw new Error('loadMoreQuote() is not implemented yet');
	}

	hovered(quote: Quote) {

	}
	quoteSelect(quote: Quote) {
	}

	quoteUnselect(quote: Quote) {
	}
}
