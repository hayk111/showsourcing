import {
	Component,
	Input
} from '@angular/core';

import { SidenavItemComponent } from '~shared/sidenav/components/sidenav-item/sidenav-item.component';


/**
 * Component made by Thierry
 * updated by Eric ;)
 */
@Component({
	selector: 'sidenav-app',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
	@Input() navTitle: string;
	@Input() headerIcon: string;
	@Input() headerTitle: string;
	@Input() headerSubTitle: string;

}
