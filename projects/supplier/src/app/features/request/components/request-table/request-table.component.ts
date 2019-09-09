import { Component, OnInit } from '@angular/core';
import { ERM, SupplierRequest } from '~core/models';
import { EntityTableComponent } from '~core/list-page';

@Component({
	selector: 'request-table-sup',
	templateUrl: './request-table.component.html',
	styleUrls: [
		'./request-table.component.scss',
		'../../../../../../../../src/app/theming/specific/list.scss'
	]
})
export class RequestTableComponent extends EntityTableComponent<SupplierRequest> implements OnInit {

	erm = ERM;

	constructor() { super(); }

	ngOnInit() { }

}
