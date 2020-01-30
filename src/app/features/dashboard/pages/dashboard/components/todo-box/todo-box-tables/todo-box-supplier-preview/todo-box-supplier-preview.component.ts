import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '~core/ORM/models';
import { SupplierService } from '~core/ORM/services';
import { TableConfig } from '~common/tables/entity-table.component';

const tableConfig: TableConfig = {
	reference: { name: 'reference', translationKey: 'reference', width: 500, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 150, sortProperty: 'status.step' },
};

@Component({
	selector: 'todo-box-supplier-preview-app',
	templateUrl: './todo-box-supplier-preview.component.html',
	styleUrls: ['./todo-box-supplier-preview.component.scss'],
})
export class TodoBoxSupplierPreviewComponent implements OnInit {

	@Input() rows: Supplier[];
	@Output() updated = new EventEmitter<undefined>();

	tableConfig = tableConfig;

	constructor(private supplierSrv: SupplierService) {}

	ngOnInit() { }

	update(ev: any) {
		this.supplierSrv.update(ev).subscribe();
		this.updated.emit();
	}
}
