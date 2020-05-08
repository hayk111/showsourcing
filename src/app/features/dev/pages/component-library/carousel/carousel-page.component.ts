import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'carousel-page-app',
	templateUrl: './carousel-page.component.html',
	styleUrls: ['./carousel-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselPageComponent  {
}
