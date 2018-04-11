import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { DEFAULT_USER_IMG } from '~app/app-root/utils';

@Component({
	selector: 'supplier-contact-app',
	templateUrl: './supplier-contact.component.html',
	styleUrls: ['./supplier-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactComponent {
	@Input() contact: any;
	@Output() nameClick = new EventEmitter<null>();
	defaultImg = DEFAULT_USER_IMG;

}
