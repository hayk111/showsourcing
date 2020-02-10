import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '~core/erm';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';

@Component({
	selector: 'selector-option-user-app',
	templateUrl: './selector-option-user.component.html',
	styleUrls: [
		'./selector-option-user.component.scss',
		'../selector-options-common.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionUserComponent extends AbstractSelectorHighlightableComponent {

	@Input() user: User;

	constructor() { super(); }

	getLabel() {
		return this.user;
	}

	getItem() {
		return this.user;
	}

}
