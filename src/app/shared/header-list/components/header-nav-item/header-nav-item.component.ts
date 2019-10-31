import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
	@Input() hasBadge: boolean;

	constructor(private router: Router) {}

	ngOnInit() {
		if (this.link === undefined) {
			throw Error('Please define a link for the tab-component');
		}
	}

}
