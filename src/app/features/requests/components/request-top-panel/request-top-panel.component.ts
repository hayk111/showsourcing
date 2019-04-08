import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SupplierRequest } from '~core/models';

@Component({
	selector: 'request-top-panel-app',
	templateUrl: './request-top-panel.component.html',
	styleUrls: ['./request-top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestTopPanelComponent implements OnInit {

	@Input() request: SupplierRequest;
	@Output() reminder = new EventEmitter<SupplierRequest>();

	constructor() { }

	ngOnInit() {
	}

}
