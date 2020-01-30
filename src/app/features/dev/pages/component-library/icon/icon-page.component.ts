import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { imageMock as mock } from '~core/ORM/models';
import { IconUtils } from '~utils';

@Component({
	selector: 'icon-page-app',
	templateUrl: './icon-page.component.html',
	styleUrls: ['./icon-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPageComponent implements OnInit {
	imageMock = mock;
	types = Object.keys(IconUtils.iconsMap);
	constructor() { }

	ngOnInit() {
	}

}
