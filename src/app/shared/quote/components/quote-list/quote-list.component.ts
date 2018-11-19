import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ExternalRequest } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'quote-list-app',
	templateUrl: './quote-list.component.html',
	styleUrls: ['./quote-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteListComponent extends TrackingComponent implements OnInit {


	@Input() externalRequests: ExternalRequest[];
	@Input() selection: Map<string, boolean>;
	@Output() bottomReached = new EventEmitter<null>();
	@Output() previewClicked = new EventEmitter<ExternalRequest>();

	hoverIndex: number;

	constructor() { super(); }

	ngOnInit() {
	}

}
