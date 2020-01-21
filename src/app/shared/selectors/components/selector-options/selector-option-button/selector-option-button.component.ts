import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';

@Component({
	selector: 'selector-option-button-app',
	templateUrl: './selector-option-button.component.html',
	styleUrls: ['./selector-option-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionButtonComponent extends AbstractSelectorHighlightableComponent {

	@Input() type: string;
	@Input() searchTxt: string;

	constructor() { super(); }

	getLabel() {
		return 'create-button';
	}

	getItem() {
		return 'create-button';
	}

}
