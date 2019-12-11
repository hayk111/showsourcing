import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Status } from '~core/models/status.model';
import { StatusUtils, Color } from '~utils';


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
	color: Color;

	ngOnInit() {
		this.color = this.getStatusColor(this.status);
	}

	getStatusColor(status: Status) {
		return StatusUtils.getStatusColor(status);
	}
}
