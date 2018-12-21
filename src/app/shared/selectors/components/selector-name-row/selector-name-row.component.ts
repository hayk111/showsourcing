import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-name-row-app',
	templateUrl: './selector-name-row.component.html',
	styleUrls: ['./selector-name-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorNameRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() item: any;

	constructor() { super(); }

	getLabel() {
		return this.item.name;
	}

}
