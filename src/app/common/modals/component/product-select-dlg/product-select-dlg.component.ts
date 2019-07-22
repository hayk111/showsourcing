import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ListPageKey, ListPageService } from '~core/list-page';
import { AutoUnsub } from '~utils';
import { ERM, Product } from '~models';
import { ProductService } from '~core/entity-services';
import { FilterType } from '~shared/filters';
import { CloseEventType, DialogService } from '~shared/dialog';
import { UserService } from '~core/entity-services';

@Component({
	selector: 'product-select-dlg',
	templateUrl: './product-select-dlg.component.html',
	styleUrls: ['./product-select-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService]
})
export class ProductSelectDlgComponent extends AutoUnsub implements OnInit {

	filterType = FilterType;

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

	@Input() initialSelectedProducts: Product[];
	@Input() submitProducts = true;

	private searchFilterElements$: Observable<any[]>;
	private unselectedProducts: { [key: string]: Product } = {};
	selectedProducts: { [key: string]: Product } = {};

	productsCount$: Observable<number>;
	private selectedProductsCount: number = 0;
	private selectedAllCount: number = 15;

	filtersPanelOpened = false;

	constructor(
		private productSrv: ProductService,
		private dlgSrv: DialogService,
		private userSrv: UserService,
		public listSrv: ListPageService<Product, ProductService>,
		) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			selectParams: { sortBy: 'category.name', descending: true, take: 15, query: 'deleted == false' },
			entityMetadata: ERM.PRODUCT,
			originComponentDestroy$: this._destroy$
		});
		
		this.initialSelection();

		this.productsCount$ = this.listSrv.filterList.valueChanges$.pipe(
			switchMap(_ => this.productSrv.selectCount(this.listSrv.filterList.asPredicate()).pipe(takeUntil(this._destroy$)))
		);
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

	submit() {
		const selectedProducts = Object.values(this.selectedProducts);
		const unselectedProducts = Object.values(this.unselectedProducts);
		const data = { selectedProducts, unselectedProducts };
		
		this.dlgSrv.close({
			type: CloseEventType.OK,
			data
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

}
