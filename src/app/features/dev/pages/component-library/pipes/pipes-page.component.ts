import { Component, ChangeDetectionStrategy } from '@angular/core';
import { imageMock as imageMock, supplierMock as supplierMock } from '~core/ORM/models';


@Component({
	selector: 'pipes-page-app',
	templateUrl: './pipes-page.component.html',
	styleUrls: ['./pipes-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipesPageComponent {
	price = {
		value: 55680, currency: 'USD'
	};
	imageMock = imageMock;
	imageUrl = '84815f96-27d8-42c7-9f4f-1d8df5a9558d.jpg';
	supplierMock = supplierMock;
	pendingImage = {
		data: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
	};
	images = [imageMock, imageMock];
	currentDate = new Date();

	size = 9999;
	userData = { firstName: 'Michel', lastName: 'Platini' };
	constructor() { }

}
