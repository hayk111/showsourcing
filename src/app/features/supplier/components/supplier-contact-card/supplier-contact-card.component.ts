import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'supplier-contact-card-app',
	templateUrl: './supplier-contact-card.component.html',
	styleUrls: ['./supplier-contact-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactCardComponent implements OnInit {
	@Input() contacts = [];
	@Output() newContact = new EventEmitter<null>();
	constructor() { }

	ngOnInit() {
	}

}
