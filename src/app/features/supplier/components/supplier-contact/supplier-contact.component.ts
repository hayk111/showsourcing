import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DEFAULT_USER_IMG } from '~app/app-root/utils';

@Component({
	selector: 'supplier-contact-app',
	templateUrl: './supplier-contact.component.html',
	styleUrls: ['./supplier-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactComponent {
	@Input() contact: any;
	defaultImg = DEFAULT_USER_IMG;

}
