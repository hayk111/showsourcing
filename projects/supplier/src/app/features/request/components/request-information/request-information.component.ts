import { Component, Input, OnInit } from '@angular/core';
import { SupplierRequest } from '~core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'request-information-sup',
	templateUrl: './request-information.component.html',
	styleUrls: ['./request-information.component.scss']
})
export class RequestInformationComponent implements OnInit {

	@Input() request: SupplierRequest;

	constructor(public translate: TranslateService) { }

	ngOnInit() {
	}

}
