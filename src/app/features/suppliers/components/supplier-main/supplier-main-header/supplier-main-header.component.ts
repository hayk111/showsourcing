import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '~app/features/suppliers/models';

@Component({
	selector: 'supplier-main-header-app',
	templateUrl: './supplier-main-header.component.html',
	styleUrls: ['./supplier-main-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierMainHeaderComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() favorited = new EventEmitter<string>();
	@Output() unfavorited = new EventEmitter<string>();
	constructor() {}

	ngOnInit() {}
}
