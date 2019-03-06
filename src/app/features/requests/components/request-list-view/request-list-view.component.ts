import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ERM } from '~core/models';

@Component({
	selector: 'request-list-view-app',
	templateUrl: './request-list-view.component.html',
	styleUrls: [
		'./request-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestListViewComponent extends ListViewComponent<Request> {

	erm = ERM;

	constructor() { super(); }

}
