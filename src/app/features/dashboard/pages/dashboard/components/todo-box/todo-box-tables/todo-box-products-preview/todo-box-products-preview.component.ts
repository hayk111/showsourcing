import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~core/models';
import { ProductService } from '~core/entity-services';
import { TableConfig } from '~common/tables/entity-table.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';

const tableConfig: TableConfig = {
	reference: { name: 'reference', translationKey: 'reference', width: 50, sortProperty: 'reference' },
	name: { name: 'name', translationKey: 'name', width: 300, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 100, sortProperty: 'status' },
	creationDate: { name: 'creationDate', translationKey: 'creationDate', width: 50, sortProperty: 'creationDate' },
};

@Component({
	selector: 'todo-box-products-preview-app',
	templateUrl: './todo-box-products-preview.component.html',
	styleUrls: ['./todo-box-products-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoBoxProductsPreviewComponent implements OnInit {
	@Input() rows: Product[];
	@Output() updated = new EventEmitter<undefined>();

	tableConfig = tableConfig;

	constructor(
		private productSrv: ProductService,
		public dialogCommonSrv: DialogCommonService,
	) { }

	ngOnInit() {
	}

	update(ev: any) {
		this.productSrv.update(ev).subscribe();
		this.updated.emit();
	}

}
