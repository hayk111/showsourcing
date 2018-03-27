import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~supplier';

@Component({
	selector: 'supplier-main-bottom-app',
	templateUrl: './supplier-main-bottom.component.html',
	styleUrls: ['./supplier-main-bottom.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierMainBottomComponent implements OnInit {
	@Input() supplier: Supplier;
	constructor() { }

	ngOnInit() { }
}
