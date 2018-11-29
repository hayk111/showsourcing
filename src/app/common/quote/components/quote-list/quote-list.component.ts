import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ERM, Quote } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ListPageProviders } from '~core/list-page/list-page-providers.class';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { QuoteFeatureService } from '~features/products/services';

@Component({
	selector: 'quote-list-app',
	templateUrl: './quote-list.component.html',
	styleUrls: ['./quote-list.component.scss'],
	providers: [
		ListPageProviders.getProviders('quotes-list', ERM.QUOTE),
	]
})
export class QuoteListComponent extends TrackingComponent implements OnInit {

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
	@Output() openCompareQuotationDialog = new EventEmitter<null>();
	@Output() previewClicked = new EventEmitter<Quote>();
	@Output() quoteSelect = new EventEmitter<Quote>();
	@Output() quoteUnselect = new EventEmitter<Quote>();

	hoverIndex: number;

	constructor(
		protected router: Router,
		protected featureSrv: QuoteFeatureService,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService,
		protected viewSrv: ListPageViewService<Quote>,
		protected dataSrv: ListPageDataService<Quote, QuoteFeatureService>
	) {
		super();
	}

	hoverRow(index: number) {
		this.hoverIndex = index;
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
	}
}
