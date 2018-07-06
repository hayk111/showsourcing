import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'tag-list-app',
	templateUrl: './tag-list.component.html',
	styleUrls: ['./tag-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexEnd]': 'align === "right"',
		'[class.flexStart]': 'align === "left"'
	}
})
export class TagListComponent implements OnInit {
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
