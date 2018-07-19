import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'badge-list-app',
	templateUrl: './badge-list.component.html',
	styleUrls: ['./badge-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexEnd]': 'align === "right"',
		'[class.flexStart]': 'align === "left"'
	}
})
export class BadgeListComponent implements OnInit {
	@Input() align: 'left' | 'right' = 'right';
	@Input() set value(v: any[] | any) {
		if (Array.isArray(v))
			this.arrayValue = v;
		else
			this.arrayValue = [v];
	}
	arrayValue = [];

	constructor() { }

	ngOnInit() {
	}

}
