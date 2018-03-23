import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'bread-crumb-app',
	templateUrl: './bread-crumb.component.html',
	styleUrls: ['./bread-crumb.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadCrumbComponent implements OnInit {
	@Input() title: string;
	@Input() subtitles: Array<string> = [];
	constructor() {}

	ngOnInit() {}
}
