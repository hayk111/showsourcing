import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { ListViewComponent, ListPageService } from '~core/list-page';
import { Sort } from '~shared/table/components/sort.interface';
import { SupplierService } from '~core/entity-services';
import { Supplier, supplierMock as mock } from '~core/models';

class Item {
	id?: string;
	name?: string;
	price?: number;
}

@Component({
	selector: 'table-lib-page-app',
	templateUrl: './table-lib-page.component.html',
	styleUrls: ['./table-lib-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TableLibPageComponent extends ListViewComponent<Supplier> implements OnInit {
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;
	currentSort: Sort = {
		sortBy: 'name',
		descending: false
	};
	rows: any = [];
	pending = false;
	currentPage = 1;
	count: number;
	selection = new Map<string, boolean>();
	constructor(public listSrv: ListPageService<Supplier, SupplierService>) { super(); }
	ngOnInit() {
		this.rows = [
			{ ...mock, id: '1', name: 'sup 1' },
			{ ...mock, id: '2', name: '2nd supp' },
			{ ...mock, id: '3', name: 'Another Supplier' }
		];
		this.count = this.rows.length;
	}
}
