import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'header-nav-item-app',
	templateUrl: './header-nav-item.component.html',
	styleUrls: ['./header-nav-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavItemComponent implements OnInit {
	@Input() icon: string;
	@Input() name: string;
	@Input() link: string;
	@Input() badgeContent: number;

	constructor() { }

	ngOnInit() {
		if (this.link === undefined) {
			throw Error('Please define a link for the tab-component');
		}
	}

}
