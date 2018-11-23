import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { ERM, Quote } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { ListPageProviders } from '~shared/list-page/list-page-providers.class';
import { Router } from '@angular/router';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
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


	public selection: Map<string, any>;
	private _quotes: Quote[] = [];
	@Input() set quotes(quotes: Quote[]) {
		this._quotes = quotes;
	}
	get quotes() {
		return this._quotes;
	}

	@Output() bottomReached = new EventEmitter<null>();
	@Output() previewClicked = new EventEmitter<Quote>();
	@Output() hovered = new EventEmitter<Quote>();
	@Output() openRfq = new EventEmitter<null>();
	@Output() openCompareQuotationDialog = new EventEmitter<null>();

	hoverIndex: number;

	constructor(
		protected router: Router,
		protected featureSrv: QuoteFeatureService,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService,
		protected viewSrv: ListPageViewService<Quote>,
		protected dataSrv: ListPageDataService<Quote, QuoteFeatureService>,
		private _ngZone: NgZone
	) {
		super();
		this._subscription.add(this.selectionSrv.selection$.subscribe(_selection => {
			console.log(_selection);
			this._ngZone.run(() => {
				this.selection = _selection;
			});
		}));
	}

	hoverRow(index: number) {
		this.hoverIndex = index;
		if (index >= 0 && this.hovered) {
			this.hovered.emit(this.quotes[index]);
		}
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
