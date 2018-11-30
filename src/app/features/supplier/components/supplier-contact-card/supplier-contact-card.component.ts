import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { DEFAULT_USER_ICON } from '~utils';
import { Contact } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-contact-card-app',
	templateUrl: './supplier-contact-card.component.html',
	styleUrls: ['./supplier-contact-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactCardComponent extends TrackingComponent {
	@Input() contacts = [];
	@Output() newContact = new EventEmitter<null>();
	@Output() openContact = new EventEmitter<Contact>();
	@Output() deleteContact = new EventEmitter<Contact>();
	defaultImg = DEFAULT_USER_ICON;

	constructor() {
		super();
	}

}
