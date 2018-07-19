import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'badge-app',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	host: {
		'[class.flexCenter]': 'size === "s" || size === "small"',
		'[class.small]': 'size === "s" || size === "small"',
		'[class.medium]': 'size === "m" || size === "medium"',
		'[class.large]': 'size === "l" || size === "large"'
	}
})
export class BadgeComponent implements OnInit {
	@Input() size: 's' | 'm' | 'l' = 's';

	constructor() { }

	ngOnInit() {
	}

}
