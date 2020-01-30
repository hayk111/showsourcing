import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ERM } from '~core/ORM/models';

import { EntitySelectionBarComponent } from '../entity-selection-bar.component';

@Component({
	selector: 'contact-selection-bar-app',
	templateUrl: './contact-selection-bar.component.html',
	styleUrls: ['./contact-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSelectionBarComponent extends EntitySelectionBarComponent {

	erm = ERM;

	constructor() {
		super();
	}

}
