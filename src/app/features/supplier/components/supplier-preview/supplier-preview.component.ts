import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '~models';


@Component({
	selector: 'supplier-preview-app',
	templateUrl: './supplier-preview.component.html',
	styleUrls: ['./supplier-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPreviewComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() close = new EventEmitter<undefined>();

	constructor() { }

	ngOnInit() {
	}

}
