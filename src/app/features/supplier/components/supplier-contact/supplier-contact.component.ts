import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'supplier-contact-app',
	templateUrl: './supplier-contact.component.html',
	styleUrls: ['./supplier-contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactComponent implements OnInit {
	@Input() contact: any;
	constructor() { }

	ngOnInit() {
	}

}
