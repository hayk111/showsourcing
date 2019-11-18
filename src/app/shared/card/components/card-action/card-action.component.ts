import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Color } from '~utils';

@Component({
	selector: 'card-action-app',
	templateUrl: './card-action.component.html',
	styleUrls: ['./card-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardActionComponent {
	@Input() color: Color = Color.PRIMARY_LIGHT;
	constructor() { }

}
