import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';

@Component({
	selector: 'selector-option-name-app',
	templateUrl: './selector-option-name.component.html',
	styleUrls: [
		'./selector-option-name.component.scss',
		'../selector-options-common.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionNameComponent extends AbstractSelectorHighlightableComponent {

	@Input() item: any;

	constructor() { super(); }

	getLabel() {
		const label = this.item.label ? this.item.label : this.item.name;
		return label;
	}

	getItem() {
		return this.item;
	}

}
