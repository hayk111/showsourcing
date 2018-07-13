import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'workflow-action-app',
	templateUrl: './workflow-action.component.html',
	styleUrls: ['./workflow-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowActionComponent implements OnInit {

	@Input() title: string;
	@Input() status: Array<any>;
	constructor() {
	}

	ngOnInit() {
		console.log(status);
	}

}
