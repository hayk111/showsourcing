import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'request-element-form-app',
	templateUrl: './request-element-form.component.html',
	styleUrls: ['./request-element-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementFormComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
