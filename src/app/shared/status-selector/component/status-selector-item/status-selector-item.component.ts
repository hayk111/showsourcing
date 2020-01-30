import { Component, Input, OnInit } from '@angular/core';
import { EntityMetadata } from '~core/erm/models';
import { Status } from '~core/erm/models/status.model';
import { Color, StatusUtils } from '~utils';


@Component({
	selector: 'status-selector-item-app',
	templateUrl: './status-selector-item.component.html',
	styleUrls: ['./status-selector-item.component.scss'],
	host: {
		class: 'flexVAlign pointer'
	}
})
export class StatusSelectorItemComponent implements OnInit {

	@Input() status: Status;
	/** property used when there is not status, to display a new state */
	@Input() type: EntityMetadata;
	color: Color;

	ngOnInit() {
		this.color = this.getStatusColor(this.status);
	}

	getStatusColor(status: Status) {
		return StatusUtils.getStatusColor(status);
	}
}
