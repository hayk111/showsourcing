import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Contact } from '~models';
import { ContactService } from '~global-services';
import { Observable, of } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { map } from 'rxjs/operators';

@Component({
	selector: 'email-list-app',
	templateUrl: './email-list.component.html',
	styleUrls: ['./email-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailListComponent implements OnInit {

	contacts$: Observable<Contact[]>;
	@Input() supplierId: string;
	constructor(private contactSrv: ContactService) { }

	ngOnInit() {
		this.contacts$ = this.contactSrv.selectMany(
			of(new SelectParams({ query: `supplier.id == "${this.supplierId}"` }))
		);
	}

}
