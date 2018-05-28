import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { DEFAULT_USER_IMG } from '~utils';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'supplier-contact-app',
	templateUrl: './supplier-contact.component.html',
	styleUrls: ['./supplier-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactComponent {
	@Input() contact: any;
	/** whether to display a border at the bottom or not, for the last item in a list */
	@Input() border: true;
	@Output() nameClick = new EventEmitter<null>();
	defaultImg = DEFAULT_USER_IMG;

	constructor(private sanitizer: DomSanitizer) { }

	sanitize(url: string) {
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}
}
