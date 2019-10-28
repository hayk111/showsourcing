import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'auth-header-subtitle-app',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>'
})
export class AuthHeaderSubtitleComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
