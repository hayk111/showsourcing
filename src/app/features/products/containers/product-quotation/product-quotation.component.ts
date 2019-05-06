import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { RfqDialogComponent } from '~common/modals';
import { ProductFeatureService, QuoteFeatureService } from '~features/products/services';
import { Product, Quote } from '~models';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';

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
		this.dlgSrv.open(RfqDialogComponent, {
			product: this.product
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
