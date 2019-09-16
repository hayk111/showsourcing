import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'card-action-app',
	templateUrl: './card-action.component.html',
	styleUrls: ['./card-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardActionComponent {

	constructor() { }

}
