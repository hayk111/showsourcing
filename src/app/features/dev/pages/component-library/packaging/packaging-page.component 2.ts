import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { mockProductVotes } from '~core/erm';

@Component({
	selector: 'packaging-page-app',
	templateUrl: './packaging-page.component.html',
	styleUrls: ['./packaging-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagingPageComponent  {

	packaging = {
		length: 25,
		width: 25,
		height: 10,
		lengthUnit: 'cm',
		weight: 560,
		quantity: 100,
		weightUnit: 'g'
	};

}
