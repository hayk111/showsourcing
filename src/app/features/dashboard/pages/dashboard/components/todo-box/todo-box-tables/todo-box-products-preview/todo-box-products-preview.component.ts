import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { TableConfig } from '~core/list-page';
import { Product } from '~core/models';

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
	tableConfig = tableConfig;

	constructor() { }

	ngOnInit() {
	}


}
