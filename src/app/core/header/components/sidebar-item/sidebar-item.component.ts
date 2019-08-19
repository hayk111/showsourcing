import { Component, Input } from '@angular/core';
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
}
