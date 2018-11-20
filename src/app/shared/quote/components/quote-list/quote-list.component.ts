import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ExternalRequest, Quote } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'quote-list-app',
	templateUrl: './quote-list.component.html',
	styleUrls: ['./quote-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteListComponent extends TrackingComponent implements OnInit {


	private _quotes: Quote[] = [];
	@Input() set quotes(quotes: Quote[]) {
		this._quotes = quotes;
	}
	get quotes() {
		return this._quotes;
	}

	@Input() selection: Map<string, boolean>;
	@Output() bottomReached = new EventEmitter<null>();
	@Output() quoteSelect = new EventEmitter<Quote>();
	@Output() quoteUnselect = new EventEmitter<Quote>();
	@Output() previewClicked = new EventEmitter<Quote>();
	@Output() hovered = new EventEmitter<Quote>();

	hoverIndex: number;

	constructor() { super(); }

	hoverRow(index: number) {
		this.hoverIndex = index;
		if (index >= 0 && this.hovered) {
			this.hovered.emit(this.quotes[index]);
		}
	}

	ngOnInit() {
	}

}
