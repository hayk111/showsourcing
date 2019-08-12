import { ChangeDetectionStrategy, Component, ContentChild } from '@angular/core';
import { CardHeaderComponent } from '../card-header/card-header.component';

@Component({
	selector: 'card-app',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexColumn mg-l'
	}
})
export class CardComponent {
	@ContentChild(CardHeaderComponent, { static: true }) header: CardHeaderComponent;
}
