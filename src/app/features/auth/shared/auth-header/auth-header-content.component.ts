import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'auth-header-content-app',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	styles: [`
		:host { text-align: left; }
	`]
})
export class AuthHeaderContentComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
