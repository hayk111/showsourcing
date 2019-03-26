import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Request } from '~core/models';

@Component({
	selector: 'request-top-panel-app',
	templateUrl: './request-top-panel.component.html',
	styleUrls: ['./request-top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestTopPanelComponent implements OnInit {

	@Input() request: Request;
	@Output() reminder = new EventEmitter<Request>();

	constructor() { }

	ngOnInit() {
	}

}
