import { Component, OnInit, Input } from '@angular/core';
import { Supplier } from '~app/features/suppliers';

@Component({
	selector: 'supplier-card-app',
	templateUrl: './supplier-card.component.html',
	styleUrls: ['./supplier-card.component.scss'],
})
export class SupplierCardComponent implements OnInit {
	@Input() supplier: Supplier;
	constructor() {}

	ngOnInit() {}
}
