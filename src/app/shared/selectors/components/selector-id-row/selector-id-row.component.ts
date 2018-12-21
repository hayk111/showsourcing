import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-id-row-app',
	templateUrl: './selector-id-row.component.html',
	styleUrls: ['./selector-id-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorIdRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() item: any;

	constructor() { super(); }

	getLabel() {
		return this.item.id;
	}

}
