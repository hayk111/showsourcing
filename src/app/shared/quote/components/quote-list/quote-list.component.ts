import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ExternalRequest, Quote } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';

@Component({
	selector: 'quote-list-app',
	templateUrl: './quote-list.component.html',
	styleUrls: ['./quote-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteListComponent extends TrackingComponent implements OnInit {


	numSelected = 0;
	private _quotes: Quote[] = [];
	@Input() set quotes(quotes: Quote[]) {
		this._quotes = quotes;
	}
	get quotes() {
		return this._quotes;
	}

	@Input() selection: Map<string, Quote>;
	@Output() bottomReached = new EventEmitter<null>();
	@Output() quoteSelect = new EventEmitter<Quote>();
	@Output() quoteUnselect = new EventEmitter<Quote>();
	@Output() previewClicked = new EventEmitter<Quote>();
	@Output() hovered = new EventEmitter<Quote>();
	@Output() openRfq = new EventEmitter<null>();
	@Output() openCompareQuotationDialog = new EventEmitter<null>();

	hoverIndex: number;

	constructor(
		protected selectionSrv: SelectionWithFavoriteService,
  ) { super(); }

	hoverRow(index: number) {
		this.hoverIndex = index;
		if (index >= 0 && this.hovered) {
			this.hovered.emit(this.quotes[index]);
		}
	}

	ngOnInit() {
	}

	quoteSelectFunc(quote: Quote) {
		this.selection.set(quote.id, quote);
		this.numSelected = this.numSelected + 1;
		if (this.quoteSelect) {
			this.quoteSelect.emit(quote);
		}
	}

	quoteUnselectFunc(quote: Quote) {
		this.selection.delete(quote.id);
		this.numSelected = this.numSelected - 1;
		if (this.quoteUnselect) {
			this.quoteUnselect.emit(quote);
		}
	}

}
