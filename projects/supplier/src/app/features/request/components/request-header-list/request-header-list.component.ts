import { Component, Input, OnInit } from '@angular/core';
import { SupplierRequest } from '~core/models';

@Component({
	selector: 'request-header-list-sup',
	templateUrl: './request-header-list.component.html',
	styleUrls: ['./request-header-list.component.scss']
})
export class RequestHeaderListComponent implements OnInit {

	@Input() request: SupplierRequest;

	constructor() { }

	ngOnInit() {
	}

}
