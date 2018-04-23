import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'supplier-status-icon-app',
	templateUrl: './supplier-status-icon.component.html',
	styleUrls: ['./supplier-status-icon.component.scss'],
})
export class SupplierStatusIconComponent implements OnInit {
	@Input() supplierId: string;
	@Input() status;
	constructor() {}

	ngOnInit() {}
}
