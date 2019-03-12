import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'auth-header-title-app',
	templateUrl: './auth-header-title.component.html',
	styleUrls: ['./auth-header-title.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthHeaderTitleComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
