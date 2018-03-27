import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~app/features/suppliers/models';

@Component({
	selector: 'supplier-main-info-app',
	templateUrl: './supplier-main-info.component.html',
	styleUrls: ['./supplier-main-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierMainInfoComponent implements OnInit {
	@Input() supplier: Supplier;
	constructor() { }

	ngOnInit() { }
}
