import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { imageMock as mock } from '~core/models';
import { iconMap } from '~shared/logo';

@Component({
	selector: 'icon-page-app',
	templateUrl: './icon-page.component.html',
	styleUrls: ['./icon-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPageComponent implements OnInit {
	imageMock = mock;
	types = Object.keys(iconMap);
	constructor() { }

	ngOnInit() {
	}

}
