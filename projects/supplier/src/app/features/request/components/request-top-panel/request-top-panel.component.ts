import { Component, Input, OnInit } from '@angular/core';
import { SupplierRequest } from '~core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'request-top-panel-sup',
	templateUrl: './request-top-panel.component.html',
	styleUrls: ['./request-top-panel.component.scss']
})
export class RequestTopPanelComponent implements OnInit {

	@Input() request: SupplierRequest;

	constructor(public translate: TranslateService) { }

	ngOnInit() {
	}

}
