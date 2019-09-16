import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardTitleComponent } from '../card-title/card-title.component';

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
	@ContentChild(CardTitleComponent, { static: true }) title: CardTitleComponent;
	@Input() padding = 'l';
}
