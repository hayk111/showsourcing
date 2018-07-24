import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Contact } from '~models';

@Component({
	selector: 'email-list-app',
	templateUrl: './email-list.component.html',
	styleUrls: ['./email-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailListComponent implements OnInit {

	@Input() contacts: Array<Contact>;
	@Input() supplierId: string;
	constructor() { }

	ngOnInit() { }

}
