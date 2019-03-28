import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RequestTemplate } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-request-template-row-app',
	templateUrl: './selector-request-template-row.component.html',
	styleUrls: ['./selector-request-template-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorRequestTemplateRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() requestTemplate: RequestTemplate;

	constructor() { super(); }

	getLabel() {
		return this.requestTemplate;
	}

}
