import { Component, Input, OnInit } from '@angular/core';
import { SupplierRequest } from '~core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'request-header-list-sup',
	templateUrl: './request-header-list.component.html',
	styleUrls: ['./request-header-list.component.scss']
})
export class RequestHeaderListComponent implements OnInit {

	@Input() request: SupplierRequest;

	constructor(public translate: TranslateService) { }

	ngOnInit() {
	}

}
