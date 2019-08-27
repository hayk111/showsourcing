import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-common-lists-lib-page',
	templateUrl: './common-lists-lib-page.component.html',
	styleUrls: ['./common-lists-lib-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadersLibPageComponent {

	products = new Array(100).fill(productMock);
}
