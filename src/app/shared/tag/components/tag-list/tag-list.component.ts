import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'tag-list-app',
	templateUrl: './tag-list.component.html',
	styleUrls: ['./tag-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent implements OnInit {

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
