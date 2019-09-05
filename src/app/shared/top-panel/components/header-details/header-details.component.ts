import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'header-details-app',
	templateUrl: './header-details.component.html',
	styleUrls: ['./header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDetailsComponent extends TrackingComponent {
	/** title displayed */
	@Input() title: string;
	@Input() hasLogo = true;
	@HostBinding('class.z-1') @Input() elevated = true;

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
