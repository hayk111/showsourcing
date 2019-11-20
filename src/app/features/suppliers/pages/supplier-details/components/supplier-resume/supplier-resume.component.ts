import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Supplier, Product } from '~core/models';

@Component({
	selector: 'supplier-resume-app',
	templateUrl: './supplier-resume.component.html',
	styleUrls: ['./supplier-resume.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierResumeComponent implements OnInit {

	@Input() supplier: Supplier;
	@Output() updated = new EventEmitter<Product>();

	constructor() { }

	ngOnInit() {
	}

	update(value: any, prop: string) {
		this.updated.emit({ id: this.supplier.id, [prop]: value });
	}

}
