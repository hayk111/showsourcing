import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { ListCommonModule } from '~common/list/list-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { SelectionBarsCommonModule } from '~common/selection-bars/selection-bars-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { NavBarModule } from '~shared/navbar';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';

import * as DetailsPage from './pages/supplier-details';
import * as TablePage from './pages/suppliers';
import { routes } from './routes';

@NgModule({
	imports: [
		ActivityCommonModule,
		NavBarModule,
		RatingModule,
		RouterModule.forChild(routes),
		SharedModule,
		PreviewsCommonModule,
		TablesCommonModule,
		SelectionBarsCommonModule,
		BoardsCommonModule,
		CardsCommonModule,
		ListCommonModule,
	],
	declarations: [
		DetailsPage.ActivityPageComponent,
		DetailsPage.ContactsPageComponent,
		DetailsPage.FilesPageComponent,
		DetailsPage.ProductsCardComponent,
		DetailsPage.ProductsPageComponent,
		DetailsPage.RequestsPageComponent,
		DetailsPage.SamplesPageComponent,
		DetailsPage.SupplierDetailsPageComponent,
		DetailsPage.SupplierDocketComponent,
		DetailsPage.SupplierHeaderDetailsComponent,
		DetailsPage.SupplierResumeComponent,
		DetailsPage.TasksPageComponent,
		TablePage.SuppliersPageComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class SuppliersFeatureModule { }
