import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardTitleComponent } from '../card-title/card-title.component';
import { CardActionComponent } from '../card-action/card-action.component';
import { CardNavComponent } from '../card-nav/card-nav.component';

@Component({
	selector: 'card-app',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexColumn card-shadow'
	}
})
export class CardComponent {
	@ContentChild(CardHeaderComponent, { static: true }) header: CardHeaderComponent;
	@ContentChild(CardTitleComponent, { static: true }) title: CardTitleComponent;
	@ContentChild(CardActionComponent, { static: true }) action: CardActionComponent;
	@ContentChild(CardNavComponent, { static: true }) nav: CardNavComponent;
	@Input() padding = 'l';
	@Input() margin = 'l';
}
