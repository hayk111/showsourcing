import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SelectionBarsCommonModule } from '~common/selection-bars/selection-bars-common.module';
import { routes } from '~features/requests/routes';
import { SharedModule } from '~shared/shared.module';

import * as DetailsPage from './pages/request-details';
import * as TablePage from './pages/requests';



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TablesCommonModule,
		SelectionBarsCommonModule
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
