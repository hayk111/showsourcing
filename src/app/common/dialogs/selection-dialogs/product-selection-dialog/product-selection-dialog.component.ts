import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductDialogService } from '~common/dialogs/services/product-dialog.service';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import { DialogService, CloseEventType } from '~shared/dialog';
import { ToastService } from '~shared/toast';
import { AutoUnsub } from '~utils';
import { Product, Project } from '~core/erm3/models';
import { UserService } from '~core/auth';
import { ListHelperService, SelectionService, ListPageViewService } from '~core/list-page2';
import { FilterType } from '~core/filters';

@Component({
	selector: 'product-select-dlg',
	templateUrl: './product-selection-dialog.component.html',
	styleUrls: ['./product-selection-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageViewService, ListHelperService, SelectionService],
	host: { class: 'table-dialog' }
})
export class ProductSelectionDialogComponent extends AutoUnsub implements OnInit {
	@Input() initialSelecteds: Product[] = [];

	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;

	filterTypes: FilterType[] = [
		FilterType.SUPPLIER,
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.PROJECTS,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.TAGS,
		FilterType.STATUS,
		FilterType.FAVORITE
	];

	constructor(
		private dlgSrv: DialogService,
		public listHelper: ListHelperService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Product>
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Project');
		this.selectionSrv.selectAll(this.initialSelecteds);
	}

	cancel() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	submit() {
		// const selectedProducts = Object.values(this.selectedProducts);
		// const unselectedProducts = Object.values(this.unselectedProducts);
		// const data = { selectedProducts, unselectedProducts };
		// this.productDlgSrv
		// 	.addProductsToProject(this.project, selectedProducts)
		// 	.subscribe(_ => {
		// 		this.dlgSrv.close({
		// 			type: CloseEventType.OK,
		// 			data
		// 		});
		// 		this.toastSrv.add({
		// 			type: ToastType.SUCCESS,
		// 			title: 'title.products-added',
		// 			message: 'message.your-projects-added-success',
		// 			timeout: 3500
		// 		});
		// 	});
	}

	done() {
		this.dlgSrv.close({ type: CloseEventType.OK, data: this.selectionSrv.getSelectedValues() });
	}
}
