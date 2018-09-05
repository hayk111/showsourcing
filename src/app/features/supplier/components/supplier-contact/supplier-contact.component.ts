import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { DEFAULT_USER_ICON } from '~utils';
import { DomSanitizer } from '@angular/platform-browser';
import { Contact } from '~models';

@Component({
	selector: 'supplier-contact-app',
	templateUrl: './supplier-contact.component.html',
	styleUrls: ['./supplier-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactComponent {
	@Input() contact: Contact;
	/** whether to display a border at the bottom or not, for the last item in a list */
	@Input() border: true;
	@Output() edit = new EventEmitter<null>();
	@Output() delete = new EventEmitter<null>();
	defaultImg = DEFAULT_USER_ICON;

	constructor(private sanitizer: DomSanitizer) { }

	sanitize(url: string) {
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}

	get initials() {
		return this.contact.name
			.split(' ')
			.map(namePart => namePart[0])
			.join(' ')
			.substr(0, 3);
	}
}
