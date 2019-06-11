import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { QuoteFeatureService } from '~features/products/services';
import { ERM, Quote } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'quote-list-app',
	templateUrl: './quote-list.component.html',
	styleUrls: ['./quote-list.component.scss'],
	providers: [
		ListPageService
	]
})
export class QuoteListComponent extends AutoUnsub implements OnInit {

	private _quotes: Quote[] = [];
	@Input() set quotes(quotes: Quote[]) {
		this._quotes = quotes;
	}
	get quotes() {
		return this._quotes;
	}

	@Output() bottomReached = new EventEmitter<null>();
	@Output() hovered = new EventEmitter<Quote>();
	@Output() openRfq = new EventEmitter<null>();
	@Output() openCompareQuotationDialog = new EventEmitter<Quote[]>();
	@Output() previewClicked = new EventEmitter<Quote>();
	@Output() quoteSelect = new EventEmitter<Quote>();
	@Output() quoteUnselect = new EventEmitter<Quote>();

	hoverIndex: number;

	constructor(
		public router: Router,
		public featureSrv: QuoteFeatureService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Quote, QuoteFeatureService>
	) {
		super();
	}

	hoverRow(index: number) {
		this.hoverIndex = index;
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.QUOTE,
			entitySrv: this.featureSrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: false },
			entityMetadata: ERM.QUOTE,
			originComponentDestroy: this._destroy$
		});
	}
}
