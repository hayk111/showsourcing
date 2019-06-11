import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'auth-header-title-app',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>'
})
export class AuthHeaderTitleComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
