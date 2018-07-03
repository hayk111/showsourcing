import { Component } from '@angular/core';

import { MenuService } from '~features/settings/services/menu.service';
import { ERM } from '~models';

@Component({
	selector: 'settings-app',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

	erm = ERM;

}
