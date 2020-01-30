import { Component, Input, OnInit } from '@angular/core';
import { SupplierRequest } from '~core/erm';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'request-header-details-sup',
	templateUrl: './request-header-details.component.html',
	styleUrls: ['./request-header-details.component.scss']
})
export class RequestHeaderDetailsComponent implements OnInit {

	@Input() request: SupplierRequest;

	constructor(public translate: TranslateService) { }

	ngOnInit() {
	}

}
