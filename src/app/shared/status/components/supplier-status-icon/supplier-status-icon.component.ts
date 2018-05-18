import { Component, OnInit, Input } from '@angular/core';
import { Supplier } from '~app/models';

@Component({
	selector: 'supplier-status-icon-app',
	templateUrl: './supplier-status-icon.component.html',
	styleUrls: ['./supplier-status-icon.component.scss'],
})
export class SupplierStatusIconComponent implements OnInit {
	@Input() supplier: Supplier;
	@Input() status;
	constructor() { }

	ngOnInit() { }
}
