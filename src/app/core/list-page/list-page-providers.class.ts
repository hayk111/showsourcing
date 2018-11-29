import { Provider } from '@angular/core';
import { Router } from '@angular/router';
import { EntityMetadata, ERM_TOKEN } from '~models';
import { DialogService } from '~shared/dialog';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ThumbService } from '~shared/rating/services/thumbs.service';

export enum ProviderKey {
	TASK = 'tasks-page',
	TAG = 'tags-page',
	EVENT = 'events-page',
	CATEGORY = 'categories-page',
	PROJECTS_PRODUCT = 'projects-products-page',
	INVITATION = 'invitations-page',
	TEAM_USER = 'team-users-page',
	SHOW = 'show-page',
	REVIEWPAGE = 'show-page',
	PROJECT_WORKFLOW = 'project-workflow-page',
	SUPPLIER_PRODUCT = 'supplier-products-page',
	SUPPLIER_TASK = 'supplier-tasks-page',
	MY_TASK = 'my-tasks-page',
	PRODUCT_TASK = 'products-tasks-page'
}

/**
 * Helper class to create providers for the different list page
 * The providers are not recreated and are stored so we can keep the state.
 */
export class ListPageProviders {

	private static selectionSrvMap = new Map<string, any>();
	private static listViewSrvMap = new Map<string, any>();
	private static listDataSrvMap = new Map<string, any>();

	/** we want those providers to be the same for the  */
	static getProviders(key: string, entityMetadata: EntityMetadata): Provider[] {
		return [
			{ provide: ERM_TOKEN, useValue: entityMetadata },
			{
				provide: SelectionWithFavoriteService,
				useFactory: () => {
					let selectionSrv = ListPageProviders.selectionSrvMap.get(key);
					if (!selectionSrv) {
						selectionSrv = new SelectionWithFavoriteService();
						ListPageProviders.selectionSrvMap.set(key, selectionSrv);
					}
					return selectionSrv;
				}
			},
			{
				provide: ListPageViewService,
				useFactory: (router: Router) => {
					let viewSrv = ListPageProviders.listViewSrvMap.get(key);
					if (!viewSrv) {
						viewSrv = new ListPageViewService(router, entityMetadata);
						ListPageProviders.listViewSrvMap.set(key, viewSrv);
					}

					return viewSrv;
				},
				deps: [Router]
			},
			{
				provide: ListPageDataService,
				useFactory: (
					dlgSrv: DialogService,
					thumbSrv: ThumbService,
					selectionSrv: SelectionWithFavoriteService
				) => {
					let dataSrv = ListPageProviders.listDataSrvMap.get(key);
					if (!dataSrv) {
						dataSrv = new ListPageDataService(dlgSrv, thumbSrv, selectionSrv);
						ListPageProviders.listDataSrvMap.set(key, dataSrv);
					}
					return dataSrv;
				},
				deps: [DialogService, ThumbService, SelectionWithFavoriteService]
			}
		];
	}
}
