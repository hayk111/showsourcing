import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contact } from '~core/models';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';

@Component({
	selector: 'selector-option-contact-app',
	templateUrl: './selector-option-contact.component.html',
	styleUrls: [
		'./selector-option-contact.component.scss',
		'../selector-options-common.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorOptionContactComponent extends AbstractSelectorHighlightableComponent {

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
