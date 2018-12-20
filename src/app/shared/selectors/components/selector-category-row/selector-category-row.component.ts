import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';
import { Category } from '~core/models';

@Component({
	selector: 'selector-category-row-app',
	templateUrl: './selector-category-row.component.html',
	styleUrls: ['./selector-category-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorCategoryRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() category: Category;

	constructor() { super(); }

	getLabel() {
		return this.category;
	}

}

