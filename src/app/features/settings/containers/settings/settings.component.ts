import { Component } from '@angular/core';

import { MenuService } from '~features/settings/services/menu.service';

@Component({
	selector: 'settings-app',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

	constructor(private menuSrv: MenuService) { }

	onMenuExpanded(state: boolean) {
		if (state) {
			this.menuSrv.collapseMenu();
		} else {
			this.menuSrv.expandMenu();
		}
	}
}
