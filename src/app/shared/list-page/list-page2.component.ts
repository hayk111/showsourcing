


import { NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GlobalServiceInterface } from '~global-services/_global/global.service';
import { ListQuery } from '~global-services/_global/list-query.interface';
import { SelectParamsConfig } from '~global-services/_global/select-params';
import { ProductQueries } from '~global-services/product/product.queries';
import { EntityMetadata, Product } from '~models';
import { CreationDialogComponent, EditionDialogComponent } from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { Filter, FilterList, SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Sort } from '~shared/table/components/sort.interface';
import { AutoUnsub } from '~utils';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataConfig } from '~shared/list-page/list-page-config.interface';



/**
 * Helper Class used by components that need to display a list,
 * it makes the bridge with the different services
 */
export abstract class ListPage2Component<T, G extends GlobalServiceInterface<T>> extends AutoUnsub {

	constructor(
		protected lpvSrv: ListPageViewService<T>,
		protected lpdSrv: ListPageDataService<T, G>,
		protected selectionSrv: SelectionService,
		protected commonDlgSrv: CommonDialogService,
	) {
		super();
	}

	init(config: ListPageDataConfig) {
		this.lpdSrv.setup(config);
		// this is made so in the view we can access the properties of
		// the different services directly
		Object.assign(this, this.lpvSrv);
		Object.assign(this, this.lpdSrv);
		Object.assign(this, this.selectionSrv);
		Object.assign(this, this.commonDlgSrv);
	}

}
