import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'card-title-badge-app',
	templateUrl: './card-title-badge.component.html',
	styleUrls: ['./card-title-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTitleBadgeComponent {

	constructor() { }

}
