import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
	ProductAddToProjectDlgComponent,
} from '~features/products/components/product-add-to-project-dlg/product-add-to-project-dlg.component';
import { ProductExportDlgComponent } from '~features/products/components/product-export-dlg/product-export-dlg.component';
import {
	ProductRequestTeamFeedbackDlgComponent,
} from '~features/products/components/product-request-team-feedback-dlg/product-request-team-feedback-dlg.component';
import { ProductFeatureService } from '~features/products/services';
import { TagService, CategoryService, SupplierService, EventService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { ERM, Product, Tag, Event, Category, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils/store/store';
import { CreationDialogComponent } from '~shared/generic-dialog';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_PRODUCT },
		SelectionService
	]
})
export class ProductsPageComponent extends ListPageComponent<Product, ProductFeatureService> implements OnInit {
	searchFilterElements$: Observable<any[]>;

	constructor(
		protected router: Router,
		protected featureSrv: ProductFeatureService,
		protected tagSrv: TagService,
		protected categorySrv: CategoryService,
		protected supplierSrv: SupplierService,
		protected eventSrv: EventService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService) {
		super(router, featureSrv, selectionSrv, filterSrv, dlgSrv, ERM.PRODUCT);
	}

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.open(ProductAddToProjectDlgComponent, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.open(ProductExportDlgComponent, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.open(ProductRequestTeamFeedbackDlgComponent, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}

	get selectionArray() {
		return Array.from(this.selectionSrv.selection.keys());
	}

	/** Search within filters */
	searchFilters(str: string) {
		this.searchFilterElements$ = zip(
			this.tagSrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${str}"` }))
			).pipe(first()),
			this.categorySrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${str}"` }))
			).pipe(first()),
			this.supplierSrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${str}"` }))
			).pipe(first()),
			this.eventSrv.selectMany(
				of(new SelectParams({ query: `alias CONTAINS "${str}"` }))
			).pipe(first()),
			this.filterSrv.filters$.pipe(first())
		).pipe(
			map(results => {
				const [ tags, categories, suppliers, events, filters ] = results;
				const elements = [];
				elements.push(...tags.map(tag => Object.assign({}, tag, { type: 'tag', checked: this.isFilter(filters, tag, 'tag') })));
				elements.push(...categories.map(category => Object.assign(
					{}, category, { type: 'category', checked: this.isFilter(filters, category, 'category') })));
				elements.push(...suppliers.map(supplier => Object.assign(
					{}, supplier, { type: 'supplier', checked: this.isFilter(filters, supplier, 'supplier') })));
				elements.push(...events.map(event => Object.assign({}, event, { type: 'event', checked: this.isFilter(filters, event, 'event') })));
				return elements;
			})
		);
	}

	isFilter(filters, element, type) {
		const typeFilters = filters.filter(filter => filter.type === type);
		const match = filters.find(filter => {
			return (filter.value === element.id); }
		);
		return !!match;
	}

	onCheckSearchElement(element) {
		console.log('>> onCheckSearchElement');
		this.filterSrv.addFilter({
			type: element.type,
			value: element.id,
			raw: element
		});
	}

	onUncheckSearchElement(element) {
		console.log('>> onUncheckSearchElement');
		this.filterSrv.removeFilter({
			type: element.type,
			value: element.id,
			raw: element
		});
	}
}
