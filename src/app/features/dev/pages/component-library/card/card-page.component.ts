import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'card-page-app',
	templateUrl: './card-page.component.html',
	styleUrls: ['./card-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent  {
	selected = 0;

}
