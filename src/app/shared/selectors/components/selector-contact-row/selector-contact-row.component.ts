import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contact } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-contact-row-app',
	templateUrl: './selector-contact-row.component.html',
	styleUrls: ['./selector-contact-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorContactRowComponent extends AbstractSelectorHighlightableComponent {

	@Input() contact: Contact;

	constructor() { super(); }

	getLabel() {
		return this.contact;
	}

}
