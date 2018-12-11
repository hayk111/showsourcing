import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/asbtract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-user-row-app',
	templateUrl: './selector-user-row.component.html',
	styleUrls: ['./selector-user-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorUserRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() user: User;

	constructor() { super(); }

	getLabel() {
		return this.user.id;
	}

}
