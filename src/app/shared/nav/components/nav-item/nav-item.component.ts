import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'nav-item-app',
	templateUrl: './nav-item.component.html',
	styleUrls: ['./nav-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent implements OnInit {
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
