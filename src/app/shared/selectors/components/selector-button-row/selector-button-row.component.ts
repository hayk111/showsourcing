import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-button-row-app',
	templateUrl: './selector-button-row.component.html',
	styleUrls: ['./selector-button-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorButtonRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() type: string;
	@Input() searchTxt: string;

	constructor() { super(); }

	getLabel() {
		return 'create-button';
	}

}
