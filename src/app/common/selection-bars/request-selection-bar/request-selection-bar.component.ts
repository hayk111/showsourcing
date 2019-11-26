import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';

@Component({
	selector: 'request-selection-bar-app',
	templateUrl: './request-selection-bar.component.html',
	styleUrls: ['./request-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestSelectionBarComponent implements OnInit {

	@Input() isShown = false;
	@Input() selection: Map<string, boolean>;
	@Input() count: number;
	@Output() cancelSelectedRequests = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
