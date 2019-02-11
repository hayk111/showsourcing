import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-status-workflow-app',
	templateUrl: './product-status-workflow.component.html',
	styleUrls: ['./product-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductStatusWorkflowComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
