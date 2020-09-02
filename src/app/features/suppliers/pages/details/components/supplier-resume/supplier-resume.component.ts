import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, Supplier, SupplierTag } from 'showsourcing-api-lib';

@Component({
	selector: 'supplier-resume-app',
	templateUrl: './supplier-resume.component.html',
	styleUrls: ['./supplier-resume.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierResumeComponent implements OnInit {

	@Input() supplier: Supplier;
	@Input() supplierTags: SupplierTag[];
	@Output() updated = new EventEmitter<Product>();

	constructor() { }

	ngOnInit() {
	}

	update(value: any, prop: string) {
		this.updated.emit({ id: this.supplier.id, [prop]: value });
	}

}
