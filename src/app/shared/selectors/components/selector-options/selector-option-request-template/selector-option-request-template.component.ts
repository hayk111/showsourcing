import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RequestTemplate } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';

@Component({
	selector: 'selector-option-request-template-app',
	templateUrl: './selector-option-request-template.component.html',
	styleUrls: ['./selector-option-request-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionRequestTemplateComponent extends AbstractSelectorHighlightableComponent {

	@Input() requestTemplate: RequestTemplate;

	constructor() { super(); }

	getLabel() {
		return this.requestTemplate;
	}

	getItem() {
		return this.requestTemplate;
	}

}