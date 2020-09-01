import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import { Product } from '~core/erm3/models';
import { FilterService, FilterType } from '~core/filters';
import { ListPageViewService, SelectionService, ExcludedService, ListHelper2Service } from '~core/list-page2';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { DefaultCreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { tap, first, switchMap} from 'rxjs/operators';
import { api, models } from 'showsourcing-api-lib';
import { TeamService } from '~core/auth';
import { ProjectProductService } from '~features/projects/services/project-product.service';

@Component({
	selector: 'product-select-dlg',
	templateUrl: './product-selection-dialog.component.html',
	styleUrls: ['./product-selection-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageViewService,
		FilterService,
		ListHelper2Service,
		SelectionService
	],
	host: { class: 'table-dialog' }
})
export class ProductSelectionDialogComponent extends AutoUnsub implements OnInit {
	@Input() ignoredIds: string[] = [];
	@Input() projectId: string;

	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;

	filterTypes: FilterType[] = [
		FilterType.SUPPLIER,
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.PROJECT,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.TAG,
		FilterType.STATUS,
		FilterType.FAVORITE
	];

	constructor(
		public filterSrv: FilterService,
		private dlgSrv: DialogService,
		public listHelper: ListHelper2Service,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Product>,
		private excludedSrv: ExcludedService,
		private projectProductSrv: ProjectProductService
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], ['name']);
		this.listHelper.setup('Product', this._destroy$);
		this.excludedSrv.excludedIds = this.ignoredIds;
	}

	createProduct() {
		this.dlgSrv.close({ component: DefaultCreationDialogComponent, type: 'Product'  })
			.data$
			.pipe(
				switchMap(product => api.Product.create([product]).local$),
				switchMap((createdProducts: models.Product[])  => {
					const product = createdProducts[0];
					return api['ProjectProduct'].create([{
						teamId: TeamService.teamSelected.id,
						product: product.id,
						project: this.projectId
					}]).local$;
				}),
				tap(_ => this.projectProductSrv.refetch()),
				first()
			).subscribe();
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
