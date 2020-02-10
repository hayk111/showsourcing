import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';

@Component({
	selector: 'selector-option-value-app',
	templateUrl: './selector-option-value.component.html',
	styleUrls: [
		'./selector-option-value.component.scss',
		'../selector-options-common.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionValueComponent extends AbstractSelectorHighlightableComponent {

	@Input() item: any;

	constructor() { super(); }

	getLabel() {
		return this.item.value;
	}

	getItem() {
		return this.item;
	}

}
