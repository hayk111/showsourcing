import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppImage, Product, Supplier, User } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'top-panel-details-app',
	templateUrl: './top-panel-details.component.html',
	styleUrls: ['./top-panel-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-1'
	}
})
export class TopPanelDetailsComponent extends TrackingComponent {
	/** title displayed */
	@Input() title: string;

	constructor(
		private location: Location
	) {
		super();
	}

	goBack() {
		this.location.back();
	}

	toDisplayString(nav: string) {
		return nav.toLowerCase().replace(/-/g, ' ');
	}
}
