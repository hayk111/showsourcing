import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { DEFAULT_USER_IMG } from '~app/app-root/utils';

@Component({
	selector: 'supplier-contact-card-app',
	templateUrl: './supplier-contact-card.component.html',
	styleUrls: ['./supplier-contact-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactCardComponent {
	@Input() contacts = [];
	@Output() newContact = new EventEmitter<null>();
	defaultImg = DEFAULT_USER_IMG;

}
