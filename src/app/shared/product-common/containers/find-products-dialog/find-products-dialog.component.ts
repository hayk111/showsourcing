import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductCommonFeatureService } from '~shared/product-common/services/product-common-feature.service';
import { ERM, Product, ProductVote, Project } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';


@Component({
	selector: 'find-products-dialog-app',
	templateUrl: './find-products-dialog.component.html',
	styleUrls: ['./find-products-dialog.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService
	]
})
export class FindProductsDialogComponent extends ListPageComponent<Product, ProductCommonFeatureService> implements OnInit, AfterViewInit {

	@Input() initialSelectedProducts: Product[];
	@Input() submitCallback: Function;
	searchFilterElements$: Observable<any[]>;
	selected: number;
	unselectedProducts: { [key: string]: Product } = {};

	constructor(
		protected router: Router,
		protected featureSrv: ProductCommonFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected cdr: ChangeDetectorRef,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);
	}


	ngAfterViewInit() {
		if (this.initialSelectedProducts && this.initialSelectedProducts.length > 0) {
			this.selectionSrv.selectAll(this.initialSelectedProducts.map(product => ({ id: product.id })));
		}
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

	hasSelectedProducts() {
		return (Array.from(this.selectionSrv.selection.values()).length > 0);
	}

	onItemSelected(entity: any, checkFavorite = false) {
		delete this.unselectedProducts[entity.id];
		super.onItemSelected(entity, checkFavorite);
	}


	onItemUnselected(entity: any, checkFavorite = false) {
		this.unselectedProducts[entity.id] = entity;
		super.onItemUnselected(entity, checkFavorite);
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	submit() {
		// we add each project one by one to the store
		const selectedProducts = this.getSelectedProducts();
		const unselectedProducts = Object.keys(this.unselectedProducts).map(key => this.unselectedProducts[key]);
		this.submitCallback({ selectedProducts, unselectedProducts })
			.subscribe(() => {
				this.dlgSrv.close();
			});
	}
}
