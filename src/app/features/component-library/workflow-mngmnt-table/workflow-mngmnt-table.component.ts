import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'workflow-mngmnt-table-lib-page-app',
	templateUrl: './workflow-mngmnt-table.component.html',
	styleUrls: ['./workflow-mngmnt-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowMngmntTableLibComponent implements OnInit {
	statuses = [
		{ name: 'new' },
		{ name: 'on going' },
		{ name: 'another ongoing' },
		{ name: 'ongoing 3' },
		{ name: 'final' }
	];
	constructor() { }

	ngOnInit() {
	}

}
