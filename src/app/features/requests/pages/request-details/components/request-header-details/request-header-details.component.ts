import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SupplierRequest } from '~core/orm/models';

@Component({
	selector: 'request-header-details-app',
	templateUrl: './request-header-details.component.html',
	styleUrls: ['./request-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestHeaderDetailsComponent implements OnInit {

	@Input() request: SupplierRequest;
	@Output() reminder = new EventEmitter<SupplierRequest>();

	constructor() { }

	ngOnInit() {
	}

}
