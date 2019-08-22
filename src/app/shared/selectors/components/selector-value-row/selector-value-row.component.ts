import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-value-row-app',
	templateUrl: './selector-value-row.component.html',
	styleUrls: ['./selector-value-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorValueRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() item: any;

	constructor() { super(); }

	getLabel() {
		return this.item.value;
	}


}
