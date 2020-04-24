import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'status-app',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent implements OnInit {
	statusTypenames = ['Product', 'Task', 'Sample', 'Supplier'];
	typenameSelected: Typename;
	entitySelected: any;
	constructor() {}

	ngOnInit(): void {}

	selectTypename(typename) {
		this.typenameSelected = typename;
		this.entitySelected = null;
	}
}
