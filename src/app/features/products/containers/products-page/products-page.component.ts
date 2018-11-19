import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product, ProductVote, ERM_TOKEN } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	CompareQuotationComponent,
	RfqDialogComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { FilterType, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TemplateService } from '~shared/template/services/template.service';
import { takeUntil } from 'rxjs/operators';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPage2Component } from '~shared/list-page/list-page2.component';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';



@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends TrackingComponent implements OnInit {
	// smartSearchFilterElements$: any;
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
		protected featureSrv: ProductFeatureService,
		protected viewSrv: ListPageViewService<Product>,
		protected dataSrv: ListPageDataService<Product, ProductFeatureService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			initialSortBy: 'category.name'
		});
		this.dataSrv.init();
	}


	// can be overriden
	onViewChange(view: 'list' | 'card') {
		// Update sorting according to the selected view
		this.dataSrv.sort({ sortBy: 'category.name', descending: false });
		this.viewSrv.changeView(view);
	}

	// smartSearch(t: any) {
	// 	//
	// }
}
