import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

@Component({
	selector: 'header-list-nav-item-app',
	templateUrl: './header-list-nav-item.component.html',
	styleUrls: ['./header-list-nav-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderListNavItemComponent implements OnInit {
	@Input() icon: string;
	@Input() name: string;
	@Input() link: string;

	constructor() {}

	ngOnInit() {
		if (this.link === undefined) {
			throw Error('Please define a link for the tab-component');
		}
	}

}
