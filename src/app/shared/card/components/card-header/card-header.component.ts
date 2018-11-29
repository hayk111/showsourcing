import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'card-header-app',
	templateUrl: './card-header.component.html',
	styleUrls: ['./card-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeaderComponent {

	constructor() { }

}
