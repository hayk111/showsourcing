import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { SearchService, FilterType } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';

@Component({
  selector: 'products-page-app',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  providers: [
    SelectionService
  ]
})
export class ProductsPageComponent extends ListPageComponent<Product, ProductFeatureService> implements OnInit {

  searchFilterElements$: Observable<any[]>;
  currentSort = { sortBy: 'creationDate', descending: true };
  // filter displayed as button in the filter panel
  filterTypes = [
    FilterType.SUPPLIER,
    FilterType.CATEGORY,
    FilterType.TAGS,
    FilterType.PROJECTS,
    FilterType.FAVORITE,
    FilterType.ARCHIVED,
  ];

  constructor(
    protected router: Router,
    protected featureSrv: ProductFeatureService,
    protected searchSrv: SearchService,
    protected selectionSrv: SelectionService,
    protected dlgSrv: DialogService,
    protected cdr: ChangeDetectorRef,
    protected moduleRef: NgModuleRef<any>) {
    super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);
  }

  /** updates the products with the new value votes */
  multipleVotes(votes: Map<string, ProductVote[]>) {
    votes.forEach((v, k) => this.update({ id: k, votes: v }));
  }

  deleteByUpdateProduct(product) {
    this.featureSrv.update({ id: product.id, delete: true });
  }
  /**
  * Selection bar actions
  *
  * Each of the actions to open dialog below will open a dialog that is itself a container.
  */

  /** Opens a dialog that lets the user add different products to different projects (many to many) */
  openAddToProjectDialog(product: Product) {
    this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
      selectedProducts: product ? [product] : this.selectionItems()
    });
  }


  /** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
  openExportDialog(product: Product) {
    this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
      selectedProducts: product ? [product] : this.selectionItems()
    });
  }

  /** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
  openRequestFeedbackDialog(product: Product) {
    this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
      selectedProducts: product ? [product] : this.selectionItems()
    });
  }

  getSelectedProducts() {
    return Array.from(this.selectionSrv.selection.values());
  }

  sortFromMenu(fieldName) {
    if (this.currentSort && this.currentSort.sortBy === fieldName) {
      this.currentSort = { ...this.currentSort, descending: !this.currentSort.descending };
    } else {
      this.currentSort = { ...this.currentSort, sortBy: fieldName };
    }
    super.sort(this.currentSort);
  }

  sort(event) {
    this.currentSort = event;
    super.sort(event);
  }

  onViewChange(v: 'list' | 'card') {
    super.onViewChange(v);
    // Update sorting according to the selected view
    if (this.view === 'list') {
      this.currentSort = { sortBy: 'creationDate', descending: false };
    } else if (this.view === 'card') {
      this.currentSort = { sortBy: 'category.name', descending: false };
    }
    super.sort(this.currentSort);
    this.cdr.detectChanges();
  }
}
