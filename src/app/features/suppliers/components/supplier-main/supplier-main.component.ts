import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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
	@Output() favorited = new EventEmitter<string>();
	@Output() unfavorited = new EventEmitter<string>();
	constructor() {}

	ngOnInit() {}
}
