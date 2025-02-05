import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductDialogService } from '~common/dialogs/services/product-dialog.service';
import { ProductService, UserService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { EntityTypeEnum, ERM, Product, Project } from '~models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, translate } from '~utils';

@Component({
	selector: 'product-select-dlg',
	templateUrl: './product-select-dlg.component.html',
	styleUrls: ['./product-select-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService]
})
export class ProductSelectDlgComponent extends AutoUnsub implements OnInit {
	columns = ['reference', 'price', 'supplier', 'category', 'createdBy', 'activities', 'status'];

	@Input() initialSelectedProducts: Product[];
	@Input() project: Project;
	@Input() submitProducts = true;

	selectItemsConfig: SelectParamsConfig;
	filterType = FilterType;
	erm = ERM;
	entityTypeEnum = EntityTypeEnum;

	filterTypes = [
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.PRODUCT_STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	private unselectedProducts: { [key: string]: Product } = {};
	selectedProducts: { [key: string]: Product } = {};

	selectedProductsCount = 0;
	private selectedAllCount = 25;

	filtersPanelOpened = false;

	constructor(
		private productSrv: ProductService,
		private dlgSrv: DialogService,
		private userSrv: UserService,
		private productDlgSrv: ProductDialogService,
		private notifSrv: NotificationService,
		public listSrv: ListPageService<Product, ProductService>,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			selectParams: { sortBy: 'category.name', descending: true, take: this.selectedAllCount, query: 'deleted == false' },
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			entityMetadata: ERM.PRODUCT,
			originComponentDestroy$: this._destroy$
		});

		this.initialSelection();
	}

	searchProduct(value) {
		this.listSrv.search(value);
		setTimeout(_ => this.initialSelection());
	}

	loadPage(page) {
		this.listSrv.loadPage(page);
		setTimeout(_ => this.initialSelection());
	}

	loadNextPage() {
		this.listSrv.loadNextPage();
		setTimeout(_ => this.initialSelection());
	}

	loadPreviousPage() {
		this.listSrv.loadPreviousPage();
		setTimeout(_ => this.initialSelection());
	}

	private initialSelection() {
		if (this.initialSelectedProducts && this.initialSelectedProducts.length > 0) {
			this.selectedProductsCount = this.initialSelectedProducts.length;

			this.listSrv.selectAll(this.initialSelectedProducts.map(product => {
				this.selectedProducts[product.id] = product;

				return ({ id: product.id });
			}));
		}
	}

	hasSelectedProducts() {
		return (Array.from(this.listSrv.selectionSrv.selection.values()).length > 0);
	}

	showFilters() {
		this.filtersPanelOpened = true;
		this.listSrv.openFilterPanel();
	}

	hideFilters() {
		this.filtersPanelOpened = false;
		this.listSrv.closeFilterPanel();
	}

	onItemSelected(entity: any) {
		this.selectedProducts[entity.id] = entity;
		delete this.unselectedProducts[entity.id];
		this.listSrv.selectionSrv.selectOne(entity, false);
		this.selectedProductsCount++;
	}

	onItemUnselected(entity: any) {
		this.unselectedProducts[entity.id] = entity;
		delete this.selectedProducts[entity.id];
		this.listSrv.selectionSrv.unselectOne(entity, false);
		this.selectedProductsCount--;
	}

	onSelectAll(entities: any[]) {
		this.listSrv.selectAll(entities);

		entities.forEach(entity => {
			this.selectedProducts[entity.id] = entity;
			delete this.unselectedProducts[entity.id];
		});

		this.selectedAllCount = entities.length;
		this.selectedProductsCount += entities.length - this.selectedProductsCount;
	}

	onUnselectAll() {
		this.listSrv.unselectAll();

		this.unselectedProducts = Object.assign({}, this.selectedProducts);
		this.selectedProducts = {};

		this.selectedProductsCount -= this.selectedAllCount;
	}

	cancel() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	submit() {
		const selectedProducts = Object.values(this.selectedProducts);
		const unselectedProducts = Object.values(this.unselectedProducts);
		const data = { selectedProducts, unselectedProducts };

		this.productDlgSrv.addProductsToProject(this.project, selectedProducts)
			.subscribe(_ => {
				this.dlgSrv.close({
					type: CloseEventType.OK,
					data
				});
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: translate('Products added'),
					message: translate('Your projects were added to the product with success'),
					timeout: 3500
				});
			});
	}

	done() {
		this.productSrv.addProducts(Object.values(this.selectedProducts));
	}

	toggleMySamples(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	toggleMyProducts(show: boolean) {
		const filterProduct = { type: FilterType.CREATED_BY, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterProduct);
		else
			this.listSrv.removeFilter(filterProduct);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
