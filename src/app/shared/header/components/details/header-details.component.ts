import { ChangeDetectionStrategy, Component, ContentChild, Input, Output, EventEmitter } from '@angular/core';
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
	@Input() backButtonIcon: 'arrow-left' | 'close' = 'arrow-left';

	@Output() back = new EventEmitter<void>();
	@ContentChild(HeaderNavComponent, { static: false }) headerNav: HeaderNavComponent;

	constructor(
		private router: Router,
	) {
		super();
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
