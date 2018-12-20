import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tag } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-tag-row-app',
	templateUrl: './selector-tag-row.component.html',
	styleUrls: ['./selector-tag-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTagRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() tag: Tag;

	constructor() { super(); }

	getLabel() {
		return this.tag;
	}

}
