import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'request-element-list-view-app',
	templateUrl: './request-element-list-view.component.html',
	styleUrls: ['./request-element-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementListViewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
