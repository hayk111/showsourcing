import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'badge-app',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	host: {
		'[class.in-progress]': 'type === "in-progress"',
		'[class.secondary]': 'type === "secondary"',
		'[class.secondary-light]': 'type === "secondary-light"',
		'[class.warn]': 'type === "warn"',
		'[class.success]': 'type === "success"',
		'[class.accent]': 'type === "accent"',
		'[class.flexVAlign]': 'true',
		'[class.flexCenter]': 'true',
		'[class.round]': 'size === "round"',
		'[class.mini]': 'size === "mini"',
		'[class.xsmall]': 'size === "xs"',
		'[class.small]': 'size === "s" || size === "small"',
		'[class.medium]': 'size === "m" || size === "medium"',
		'[class.large]': 'size === "l" || size === "large"'
	}
})
export class BadgeComponent implements OnInit {
	@Input() size = 's';
	/** type gives us the possibility to have predefined color set
	 * for background and color. The none type is when we want to inherit
	 */
	@Input() type: 'in-progress' | 'secondary' | 'secondary-light' | 'accent' | 'success' | 'warn' | 'none' = 'secondary';

	constructor() { }

	ngOnInit() {
	}

}
