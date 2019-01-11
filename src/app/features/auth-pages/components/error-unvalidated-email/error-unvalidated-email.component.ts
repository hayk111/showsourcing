import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'error-unvalidated-email-app',
	templateUrl: './error-unvalidated-email.component.html',
	styleUrls: ['./error-unvalidated-email.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorUnvalidatedEmailComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
