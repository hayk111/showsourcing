import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'tag-app',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss'],
	host: {
		'[class.flexCenter]': 'labelSize === "s" || labelSize === "small"',
		'[class.small]': 'labelSize === "s" || labelSize === "small"',
		'[class.medium]': 'labelSize === "m" || labelSize === "medium"',
		'[class.large]': 'labelSize === "l" || labelSize === "large"'
	}
})
export class TagComponent implements OnInit {
	@Input() labelSize: 's' | 'm' | 'l' = 's';

	constructor() { }

	ngOnInit() {
	}

}
