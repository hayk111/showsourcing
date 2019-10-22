import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'unvalidated-email-app',
	templateUrl: './unvalidated-email.component.html',
	styleUrls: ['./unvalidated-email.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnvalidatedEmailComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
