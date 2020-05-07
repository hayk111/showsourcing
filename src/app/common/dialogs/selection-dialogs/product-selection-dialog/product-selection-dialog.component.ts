import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import { Product } from '~core/erm3/models';
import { FilterType } from '~core/filters';
import { ListHelperService, ListPageViewService, SelectionService, ExcludedService } from '~core/list-page2';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-select-dlg',
	templateUrl: './product-selection-dialog.component.html',
	styleUrls: ['./product-selection-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageViewService, ListHelperService, SelectionService],
	host: { class: 'table-dialog' }
})
export class ProductSelectionDialogComponent extends AutoUnsub implements OnInit {
	@Input() ignoredIds: string[] = [];

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
		public viewSrv: ListPageViewService<Product>,
		private excludedSrv: ExcludedService
	) {
		super();
	}

	ngOnInit() {
		this.excludedSrv.excludedIds = this.ignoredIds;
		this.listHelper.setup('Product');
		// this.selectionSrv.selectAll(this.initialSelecteds);
	}

	// submit() {
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
	// }

	/** send selected products to the observable returned by commonDlg.openSelectionDlg().data$ and close the dialog  */
	done() {
		this.dlgSrv.data(this.selectionSrv.getSelectedValues());
		this.dlgSrv.close();
	}
}
