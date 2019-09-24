import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SupplierRequest } from '~core/models';

@Component({
	selector: 'request-header-list-app',
	templateUrl: './request-header-list.component.html',
	styleUrls: ['./request-header-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestHeaderListComponent implements OnInit {

	@Input() request: SupplierRequest;
	@Output() reminder = new EventEmitter<SupplierRequest>();

	constructor() { }

	ngOnInit() {
	}

}
