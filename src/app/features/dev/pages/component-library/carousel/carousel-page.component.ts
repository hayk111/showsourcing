import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'carousel-page-app',
	templateUrl: './carousel-page.component.html',
	styleUrls: ['./carousel-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselPageComponent  {
	product;
	static = false;
	size = 411;
	hasPreview: boolean;
	hasZoomEffect = true;
	showConfirmOnDelete: boolean;
	objectFit = 'contain';
	objectFitChoices = ['fill', 'contain', 'cover', 'none'].map(x => ({ value: x, label: x }));


	constructor(private fb: FormBuilder) {}
}
