import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/asbtract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-text-row-app',
	templateUrl: './selector-text-row.component.html',
	styleUrls: ['./selector-text-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTextRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() text: string;

	constructor() { super(); }

	getLabel() {
		return this.text;
	}

}
