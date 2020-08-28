import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SupplierService } from '~core/erm';
import { ERM, Supplier } from '~core/erm';
import { Sort } from '~shared/table/models/sort.interface';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { ListHelper2Service } from '~core/list-page2';

@Component({
	selector: 'table-page-app',
	templateUrl: './table-page.component.html',
	styleUrls: ['./table-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListHelper2Service
	]
})
export class TablePageComponent extends EntityTableComponent<Supplier> implements OnInit, OnDestroy {
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;
	currentSort: Sort;
	_destroy$ = new Subject<void>();

	constructor(
		private supplierSrv: SupplierService,
		public listSrv: ListHelper2Service
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup('Product', this._destroy$);
	}


}
