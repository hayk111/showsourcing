import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { imageMock as mock } from '~core/models';
import { iconMap } from '~shared/icons/components/logo/logo.component';

@Component({
	selector: 'icons-page-app',
	templateUrl: './icons-page.component.html',
	styleUrls: ['./icons-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsPageComponent implements OnInit {
	imageMock = mock;
	types = Object.keys(iconMap);
	constructor() { }

	ngOnInit() {
	}

}
