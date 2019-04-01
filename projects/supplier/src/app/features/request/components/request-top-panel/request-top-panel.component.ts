import { Component, Input, OnInit } from '@angular/core';
import { SupplierRequest } from '~core/models';

@Component({
	selector: 'request-top-panel-sup',
	templateUrl: './request-top-panel.component.html',
	styleUrls: ['./request-top-panel.component.scss']
})
export class RequestTopPanelComponent implements OnInit {

	@Input() request: SupplierRequest;

	constructor() { }

	ngOnInit() {
	}

}
