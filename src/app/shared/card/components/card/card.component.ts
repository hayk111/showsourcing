import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'card-app',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2 mg-default'
	}
})
export class CardComponent {

}
