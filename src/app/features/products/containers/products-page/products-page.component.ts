import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product, ProductVote } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils/store/store';

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

	// if all the selected items are favorite or not
	allSelectedFavorite = true;

	searchFilterElements$: Observable<any[]>;

	constructor(
		protected router: Router,
		protected featureSrv: ProductFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, filterSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);
	}

	onSelectedItem(item: any) {
		if (this.allSelectedFavorite)
			this.allSelectedFavorite = item.favorite ? true : false;
		this.onItemSelected(item);
	}

	onUnselectedItem(item: any) {
		if (!this.allSelectedFavorite && !item.favorite)
			this.allSelectedFavorite = !this.selectionItems().some(prod => prod.id !== item.id && !prod.favorite);
		this.onItemUnselected(item);
	}

	onFavoriteAll() {
		this.selectionItems().forEach(prod => {
			if (!prod.favorite)
				this.onItemFavorited(prod.id);
		});
		this.allSelectedFavorite = true;
	}

	onUnfavoriteAll() {
		this.selectionItems().forEach(prod => {
			if (prod.favorite)
				this.onItemUnfavorited(prod.id);
		});
		this.allSelectedFavorite = false;
	}

	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => {
			this.update({ id: k, votes: v });
		});
	}

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}
}
