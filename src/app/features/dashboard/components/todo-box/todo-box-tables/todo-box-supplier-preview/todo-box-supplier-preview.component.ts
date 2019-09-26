import { Component, OnInit, Input } from '@angular/core';
import { TableConfig } from '~core/list-page';
import { Supplier } from '~models';

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

	tableConfig = tableConfig;

	@Input() rows: Supplier[];

	constructor() {
	}

	ngOnInit() { }

}
