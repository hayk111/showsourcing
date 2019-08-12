import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { imageMock as mock } from '~core/models';

@Component({
	selector: 'app-icons-lib-page',
	templateUrl: './icons-lib-page.component.html',
	styleUrls: ['./icons-lib-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsLibPageComponent implements OnInit {
	imageMock = mock;
	constructor() { }

	ngOnInit() {
	}

}
