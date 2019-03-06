import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'request-form-app',
	templateUrl: './request-form.component.html',
	styleUrls: ['./request-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFormComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
