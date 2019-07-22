import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { ProductService, UserService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Product } from '~models';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	providers: [
		ListPageService,
		CommonModalService
	]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit, AfterViewInit {
	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
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

	productsCount$: Observable<number>;

	constructor(
		private router: Router,
		private productSrv: ProductService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Product, ProductService>,
		public elem: ElementRef,
		private userSrv: UserService,
	) {
		super();
	}

	toggleMyProducts(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}
	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.PRODUCTS,
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name', 'description'],
			selectParams: { query: 'deleted == false' },
			// we use the deleted filter there so we can send the query to export all to the export dlg
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			entityMetadata: ERM.PRODUCT,
			originComponentDestroy$: this._destroy$
		}, false);

		this.productsCount$ = this.listSrv.filterList.valueChanges$.pipe(
			switchMap(_ => this.productSrv.selectCount(this.listSrv.filterList.asPredicate()).pipe(takeUntil(this._destroy$)))
		);
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}

	onViewChange(view: 'list' | 'card') {
		this.listSrv.changeView(view);
	}

	getFilterAmount() {
		// we filter so we don't count archieved or deleted when it's false, so the user doesn't get confused since its the default filter
		const filters = this.listSrv.filterList.asFilters()
			.filter(fil => !(fil.type === FilterType.ARCHIVED && fil.value === false) && !(fil.type === FilterType.DELETED && fil.value === false));
		return filters.length;
	}

}
