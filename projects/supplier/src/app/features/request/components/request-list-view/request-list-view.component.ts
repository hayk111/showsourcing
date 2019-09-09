import { Component, OnInit } from '@angular/core';
import { ERM, SupplierRequest } from '~core/models';
import { EntityTableComponent } from '~core/list-page';

@Component({
	selector: 'request-list-view-sup',
	templateUrl: './request-list-view.component.html',
	styleUrls: [
		'./request-list-view.component.scss',
		'../../../../../../../../src/app/theming/specific/list.scss'
	]
})
export class RequestListViewComponent extends EntityTableComponent<SupplierRequest> implements OnInit {

	erm = ERM;

	constructor() { super(); }

	ngOnInit() { }

}
