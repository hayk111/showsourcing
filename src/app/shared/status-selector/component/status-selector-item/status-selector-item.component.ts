import { Component, Input, OnInit } from '@angular/core';
import { Color, StatusUtils } from '~utils';
import { Typename } from '~core/erm3/typename.type';
import { WorkflowStatus } from '~core/erm3/models';

@Component({
	selector: 'status-selector-item-app',
	templateUrl: './status-selector-item.component.html',
	styleUrls: ['./status-selector-item.component.scss'],
	host: {
		class: 'flexVAlign pointer',
	},
})
export class StatusSelectorItemComponent implements OnInit {
	@Input() status: WorkflowStatus;
	/** property used when there is not status, to display a new state */
	@Input() typename: Typename;
	color: Color;

	ngOnInit() {
		this.color = this.getStatusColor(this.status);
	}

	getStatusColor(status: WorkflowStatus) {
		return StatusUtils.getStatusColor(status);
	}
}
