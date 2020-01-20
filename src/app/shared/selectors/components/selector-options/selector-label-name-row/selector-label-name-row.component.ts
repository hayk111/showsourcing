import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-label-name-row-app',
	templateUrl: './selector-label-name-row.component.html',
	styleUrls: ['./selector-label-name-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorLabelNameRowComponent extends AbstractSelectorHighlightableComponent {

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
