import { Provider } from '@angular/core';
import { Router } from '@angular/router';
import { EntityMetadata, ERM_TOKEN } from '~models';
import { DialogService } from '~shared/dialog/services';
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
	PRODUCT_TASK = 'products-tasks-page',
	PRODUCT_SAMPLE = 'products-samples-page',
	SAMPLE = 'samples-page',
	SUPPLIER_SAMPLE = 'products-samples-page'
}

/**
 * Helper class to create providers for the different list page
 * The providers are not recreated and are stored so we can keep the state.
 */
const selectionSrvMap = new Map<string, any>();
const listViewSrvMap = new Map<string, any>();
const listDataSrvMap = new Map<string, any>();

/** we want those providers to be the same for the  */
export function getProviders(key: string, entityMetadata?: EntityMetadata): Provider[] {
	return [
		// { provide: ERM_TOKEN, useValue: entityMetadata },
		{
			provide: SelectionWithFavoriteService,
			useFactory: () => {
				let selectionSrv = selectionSrvMap.get(key);
				if (!selectionSrv) {
					selectionSrv = new SelectionWithFavoriteService();
					selectionSrvMap.set(key, selectionSrv);
				}
				return selectionSrv;
			}
		},
		{
			provide: ListPageViewService,
			useFactory: (router: Router) => {
				let viewSrv = listViewSrvMap.get(key);
				if (!viewSrv) {
					viewSrv = new ListPageViewService(router, entityMetadata);
					listViewSrvMap.set(key, viewSrv);
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
				let dataSrv = listDataSrvMap.get(key);
				if (!dataSrv) {
					dataSrv = new ListPageDataService(dlgSrv, thumbSrv, selectionSrv);
					listDataSrvMap.set(key, dataSrv);
				}
				return dataSrv;
			},
			deps: [DialogService, ThumbService, SelectionWithFavoriteService]
		}
	];
}
