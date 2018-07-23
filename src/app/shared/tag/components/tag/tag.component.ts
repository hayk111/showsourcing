import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'tag-app',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss'],
	host: {
		'[class.flexCenter]': 'size === "s" || size === "small"',
		'[class.small]': 'size === "s" || size === "small"',
		'[class.medium]': 'size === "m" || size === "medium"',
		'[class.large]': 'size === "l" || size === "large"'
	}
})
export class TagComponent implements OnInit {
	@Input() size: 's' | 'm' | 'l' = 's';

	constructor() { }

	ngOnInit() {
	}

}
