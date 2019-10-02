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
	@Input() subTitle: string;
	@Input() hasBackArrow = true;
	@Input() hasLogo = true;
	@Input() headerType: 'details' | 'settings' | 'table';
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

	getType(cls?: string) {
		return cls
			? cls + (this.headerType ? '-' + this.headerType : '')
			: this.headerType;
	}

}
