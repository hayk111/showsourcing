import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableConfig } from '~core/list-page';
import { Product } from '~core/models';
import { ProductService } from '~core/entity-services';

const tableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 190, sortProperty: 'creationDate' },
	reference: { name: 'reference', translationKey: 'reference', width: 320, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 165, sortProperty: 'status.step' },
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
	) { }

	ngOnInit() {
	}

	update(ev: any) {
		this.productSrv.update(ev).subscribe();
		this.updated.emit();
	}

}
