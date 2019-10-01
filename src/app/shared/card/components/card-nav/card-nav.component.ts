import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'card-nav-app',
	templateUrl: './card-nav.component.html',
	styleUrls: ['./card-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex' }
})
export class CardNavComponent {

}
