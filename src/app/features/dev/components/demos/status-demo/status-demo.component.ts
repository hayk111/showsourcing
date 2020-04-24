import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'status-demo-app',
	templateUrl: './status-demo.component.html',
	styleUrls: ['./status-demo.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDemoComponent implements OnInit {
	statusTypenames = ['Product', 'Task', 'Sample', 'Supplier'];
	typenameSelected: Typename;
	entitySelected: any;
	constructor() {}

	ngOnInit(): void {}

	selectTypename(typename) {
		this.typenameSelected = typename;
		this.entitySelected = null;
	}

	selectEntity(entity) {
		this.entitySelected = entity;
	}
}
