import { Location } from '@angular/common';
import { Component, Input, } from '@angular/core';


@Component({
	selector: 'sidenav-item-app',
	templateUrl: './sidenav-item.component.html',
	styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent {
	@Input() icon: string;
	@Input() name: string;
	@Input() link: string;

}
