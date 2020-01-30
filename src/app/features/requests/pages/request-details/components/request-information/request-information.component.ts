import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SupplierRequest } from '~core/erm/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'request-information-app',
	templateUrl: './request-information.component.html',
	styleUrls: ['./request-information.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestInformationComponent implements OnInit {

	@Input() request: SupplierRequest;

	constructor(public translate: TranslateService) { }

	ngOnInit() {
	}

}
