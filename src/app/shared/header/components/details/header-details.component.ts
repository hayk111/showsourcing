import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';

import { HeaderNavComponent } from './components/nav/header-nav.component';
import { Router } from '@angular/router';

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
	@ContentChild(HeaderNavComponent, { static: false }) headerNav: HeaderNavComponent;

	constructor(
		private router: Router,
	) {
		super();
	}

	/**
	 * Redirects to table page
	 */
	goBack() {
		const secondSlashIndex = this.router.url.slice(1).indexOf('/');
		const pathToBack = this.router.url.slice(1, secondSlashIndex + 1);
		this.router.navigate([pathToBack]);
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
