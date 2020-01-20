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

	getItem() {
		return this.contact;
	}

	// if the contact does not have a name we will use the email name
	getEmailName() {
		let name = '';
		if (this.contact.email) {
			name = this.contact.email.split('@')[0].split(new RegExp('[-._]')).join(' ');
		}
		return name;
	}

}
