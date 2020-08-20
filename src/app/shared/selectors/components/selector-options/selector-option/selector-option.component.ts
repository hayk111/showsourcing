import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'selector-option-app',
	templateUrl: './selector-option.component.html',
	styleUrls: ['./selector-option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionComponent extends AbstractSelectorHighlightableComponent {

	@Input() typename: Typename;
	@Input() item: any;
	@Input() customType: string;

	constructor() { super(); }

	getLabel() {
		const label = this.item.label ? this.item.label : this.item.name;
		return label;
	}

	getItem() {
		return this.item;
	}

}
