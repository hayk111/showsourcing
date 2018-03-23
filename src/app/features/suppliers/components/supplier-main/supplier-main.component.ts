import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~app/features/suppliers/models';

@Component({
	selector: 'supplier-main-app',
	templateUrl: './supplier-main.component.html',
	styleUrls: ['./supplier-main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierMainComponent implements OnInit {
	@Input() supplier: Supplier;
	@Input() productsCount: number;
	constructor() {}

	ngOnInit() {}
}
