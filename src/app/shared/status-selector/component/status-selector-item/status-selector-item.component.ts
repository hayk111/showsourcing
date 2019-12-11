import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Status } from '~core/models/status.model';
import { StatusUtils } from '~utils';


@Component({
	selector: 'status-selector-item-app',
	templateUrl: './status-selector-item.component.html',
	styleUrls: ['./status-selector-item.component.scss'],
	host: {
		class: 'flexVAlign pointer pd-xs'
	}
})
export class StatusSelectorItemComponent implements OnInit {

	@Input() status: Status;

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

	ngOnInit() {
		const color = this.getStatusColor(this.status);
		this.renderer.addClass(this.elementRef.nativeElement, color);
	}

	getStatusColor(status: Status) {
		return StatusUtils.getStatusColor(status);
	}
}
