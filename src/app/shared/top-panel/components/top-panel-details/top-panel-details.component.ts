import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
	@Input() hasLogo = true;

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
