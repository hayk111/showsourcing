import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'user-settings-app',
	templateUrl: './user-settings.component.html',
	styleUrls: ['./user-settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
