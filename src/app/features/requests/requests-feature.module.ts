import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingMenusCommonModule } from '~common/sorting-menus/sorting-menus-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/requests/routes';
import { SharedModule } from '~shared/shared.module';

import * as DetailsPage from './pages/request-details';
import * as TablePage from './pages/requests';



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TablesCommonModule,
		SortingMenusCommonModule
	],
	declarations: [
		DetailsPage.RequestDetailsPageComponent,
		DetailsPage.RequestHeaderDetailsComponent,
		DetailsPage.RequestInformationComponent,
		TablePage.RequestsPageComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class RequestsFeatureModule {

}
