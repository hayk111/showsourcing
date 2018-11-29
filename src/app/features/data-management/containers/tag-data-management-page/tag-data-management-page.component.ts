import { ChangeDetectionStrategy, Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { TagManagememtService } from '~features/data-management/services/tag-management.service';
import { ERM, Tag, ERM_TOKEN } from '~models';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { ListPageProviders, ProviderKey } from '~core/list-page/list-page-providers.class';

@Component({
	selector: 'tag-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./tag-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders(ProviderKey.TAG, ERM.TAG),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.TAG }
	]
})
export class TagDataManagementPageComponent extends AbstractDataManagementComponent<Tag, TagManagememtService> {

	constructor(
		protected router: Router,
		protected featureSrv: TagManagememtService,
		protected viewSrv: ListPageViewService<Tag>,
		public dataSrv: ListPageDataService<Tag, TagManagememtService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super(router, featureSrv, viewSrv, dataSrv, selectionSrv, commonDlgSrv, ERM.TAG);
	}
}
