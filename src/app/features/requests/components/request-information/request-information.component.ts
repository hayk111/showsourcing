import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Request } from '~core/models';

@Component({
	selector: 'request-information-app',
	templateUrl: './request-information.component.html',
	styleUrls: ['./request-information.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestInformationComponent implements OnInit {

	@Input() request: Request;

	constructor() { }

	ngOnInit() {
	}

}
