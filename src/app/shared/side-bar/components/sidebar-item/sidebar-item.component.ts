import { Component, Input, NgZone } from '@angular/core';
import { Router} from '@angular/router';
import { TrackingComponent } from '~utils';

@Component({
	selector: 'sidebar-item-app',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.scss'],
})

export class SidebarItemComponent extends TrackingComponent {
	@Input() icon: string;
	@Input() link: string;
	@Input() badge: any;
	@Input() subItems: any[];
	hovered = false;

	constructor(private ngZone: NgZone, private router: Router) { super(); }

	navigate(link: string) {
		this.ngZone.run(() => {
			return this.router.navigate(link.split('/').filter(str => !!str));
		}).then();
	}
}
