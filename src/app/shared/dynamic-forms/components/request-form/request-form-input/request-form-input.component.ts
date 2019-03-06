import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'request-form-input-app',
	templateUrl: './request-form-input.component.html',
	styleUrls: ['./request-form-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFormInputComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
