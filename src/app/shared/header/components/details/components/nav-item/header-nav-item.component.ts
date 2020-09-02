import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'header-nav-item-app',
	templateUrl: './header-nav-item.component.html',
	styleUrls: ['./header-nav-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavItemComponent {
	@Input() icon: string;
	@Input() name: string;
	@Input() link: string;
	@Input() active = false;
	@Input() badgeContent: number;

	constructor() { }

}
