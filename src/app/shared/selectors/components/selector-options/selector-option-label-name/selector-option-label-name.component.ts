import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';

@Component({
	selector: 'selector-option-label-name-app',
	templateUrl: './selector-option-label-name.component.html',
	styleUrls: [
		'./selector-option-label-name.component.scss',
		'../selector-options-common.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionLabelNameComponent extends AbstractSelectorHighlightableComponent {

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
