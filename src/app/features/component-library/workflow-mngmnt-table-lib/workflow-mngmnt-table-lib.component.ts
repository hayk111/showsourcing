import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'workflow-mngmnt-table-lib-page-app',
	templateUrl: './workflow-mngmnt-table-lib.component.html',
	styleUrls: ['./workflow-mngmnt-table-lib.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowMngmntTableLibComponent implements OnInit {
	statuses = [
		{ name: 'new', category: 'a category', step: 0 },
		{ name: 'on going', category: 'a category', step: 1 },
		{ name: 'another ongoing', category: 'a category', step: 2 },
		{ name: 'ongoing 3', category: 'a category', step: 3 },
		{ name: 'final', category: 'a category', step: 4, final: true }
	];
	constructor() { }

	ngOnInit() {
	}

}
