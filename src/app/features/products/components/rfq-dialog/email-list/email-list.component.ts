import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
@Component({
	selector: 'email-list-app',
	templateUrl: './email-list.component.html',
	styleUrls: ['./email-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailListComponent extends TrackingComponent implements OnInit {

	@Input() contacts: Array<Contact>;
	@Input() supplierId: string;
	@Input() selected: Map<string, Contact>;
	@Output() onSelectMail = new EventEmitter<Array<any>>();
	@Output() onUnselectMail = new EventEmitter<any>();

	constructor() {
    super();
  }

	ngOnInit() { }

}
