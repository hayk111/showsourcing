import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectWorkflowFeatureService } from '~features/project/services';
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
	selector: 'add-products-dialog-app',
	templateUrl: './add-products-dialog.component.html',
	styleUrls: ['./add-products-dialog.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_PRODUCT },
		SelectionService
	]
})
export class AddProductsDialogComponent extends ListPageComponent<Product, ProjectWorkflowFeatureService> implements OnInit {

	searchFilterElements$: Observable<any[]>;

	constructor(
		protected router: Router,
		protected featureSrv: ProjectWorkflowFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
		protected cdr: ChangeDetectorRef,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, filterSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

	hasSelectedProducts() {
		return (Array.from(this.selectionSrv.selection.values()).length > 0);
	}

	closeDlg() {
		this.dlgSrv.close();
	}

  createProducts() {
    
  }
}
