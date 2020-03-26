import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
} from '@angular/core';
import { ProductDialogService } from '~common/dialogs/services/product-dialog.service';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import {
	DEFAULT_TAKE_PAGINATION,
	ERM,
	Product,
	ProductService,
	Project,
	SelectParamsConfig,
	UserService
} from '~core/erm';
import { CloseEventType, DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-select-dlg',
	templateUrl: './product-select-dlg.component.html',
	styleUrls: ['./product-select-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		// ListPageService,
		// FilterService,
		// SelectionService
	],
	host: { class: 'table-dialog' }
})
export class ProductSelectDlgComponent extends AutoUnsub implements OnInit {
	@Input() initialSelectedProducts: Product[];
	@Input() project: Project;
	@Input() submitProducts = true;

	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;

	selectItemsConfig: SelectParamsConfig;
	// filterType = FilterType;
	erm = ERM;

	filterTypes = [
		// FilterType.SUPPLIER,
		// FilterType.ARCHIVED,
		// FilterType.CATEGORY,
		// FilterType.PROJECTS,
		// FilterType.CREATED_BY,
		// FilterType.EVENT,
		// FilterType.TAGS,
		// FilterType.STATUS,
		// FilterType.FAVORITE
	];

	private unselectedProducts: { [key: string]: Product } = {};
	selectedProducts: { [key: string]: Product } = {};

	selectedProductsCount = 0;
	private selectedAllCount = DEFAULT_TAKE_PAGINATION;

	constructor(
		private productSrv: ProductService,
		private dlgSrv: DialogService,
		private userSrv: UserService,
		private productDlgSrv: ProductDialogService,
		private toastSrv: ToastService,
		// public listSrv: ListPageService<Product, ProductService>,
		// private selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		this.initialSelection();
	}

	searchProduct(value) {
		// this.listSrv.search(value);
		// setTimeout(_ => this.initialSelection());
	}

	loadPage(page) {
		// this.listSrv.loadPage(page);
		// setTimeout(_ => this.initialSelection());
	}

	loadNextPage() {
		// this.listSrv.loadNextPage();
		// setTimeout(_ => this.initialSelection());
	}

	loadPreviousPage() {
		// this.listSrv.loadPreviousPage();
		// setTimeout(_ => this.initialSelection());
	}

	private initialSelection() {
		// if (
		// 	this.initialSelectedProducts &&
		// 	this.initialSelectedProducts.length > 0
		// ) {
		// 	this.selectedProductsCount = this.initialSelectedProducts.length;

		// 	this.selectionSrv.selectAll(
		// 		this.initialSelectedProducts.map(product => {
		// 			this.selectedProducts[product.id] = product;

		// 			return { id: product.id };
		// 		})
		// 	);
		// }
	}

	hasSelectedProducts() {
		// return Array.from(this.selectionSrv.selection.values()).length > 0;
	}

	onItemSelected(entity: any) {
		// this.selectedProducts[entity.id] = entity;
		// delete this.unselectedProducts[entity.id];
		// this.selectionSrv.selectOne(entity);
		// this.selectedProductsCount++;
	}

	onItemUnselected(entity: any) {
		// this.unselectedProducts[entity.id] = entity;
		// delete this.selectedProducts[entity.id];
		// this.selectionSrv.unselectOne(entity);
		// this.selectedProductsCount--;
	}

	onSelectAll(entities: any[]) {
		// this.selectionSrv.selectAll(entities);

		// entities.forEach(entity => {
		// 	this.selectedProducts[entity.id] = entity;
		// 	delete this.unselectedProducts[entity.id];
		// });

		// this.selectedAllCount = entities.length;
		// this.selectedProductsCount += entities.length - this.selectedProductsCount;
	}

	onUnselectAll() {
		// this.selectionSrv.unselectAll();

		// this.unselectedProducts = Object.assign({}, this.selectedProducts);
		// this.selectedProducts = {};

		// this.selectedProductsCount -= this.selectedAllCount;
	}

	cancel() {
		// this.dlgSrv.close({ type: CloseEventType.CANCEL });
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
		// this.productSrv.addProducts(Object.values(this.selectedProducts));
	}

	toggleMySamples(show: boolean) {
		// const filterAssignee = {
		// 	type: FilterType.ASSIGNEE,
		// 	value: this.userSrv.userSync.id
		// };
		// if (show) this.filterSrv.addFilter(filterAssignee);
		// else this.filterSrv.removeFilter(filterAssignee);
	}

	toggleMyProducts(show: boolean) {
		// const filterProduct = {
		// 	type: FilterType.CREATED_BY,
		// 	value: this.userSrv.userSync.id
		// };
		// if (show) this.filterSrv.addFilter(filterProduct);
		// else this.filterSrv.removeFilter(filterProduct);
	}

	showItemsPerPage(count: number) {
		// this.selectItemsConfig = { take: Number(count) };
		// this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
