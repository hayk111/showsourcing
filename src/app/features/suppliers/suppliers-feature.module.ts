import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { SelectionBarsCommonModule } from '~common/selection-bars/selection-bars-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { NavBarModule } from '~shared/navbar';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';

import * as DetailsPage from './pages/supplier-details';
import * as TablePage from './pages/suppliers';
import { routes } from './routes';
import { SupplierFeatureService } from './services';

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
		CardsCommonModule
	],
	declarations: [
		DetailsPage.ActivityPageComponent,
		DetailsPage.FilesPageComponent,
		DetailsPage.ProductsCardComponent,
		DetailsPage.ProductsPageComponent,
		DetailsPage.SamplesPageComponent,
		DetailsPage.SupplierDetailsPageComponent,
		DetailsPage.SupplierHeaderDetailsComponent,
		DetailsPage.TasksPageComponent,
		TablePage.SuppliersPageComponent,
		DetailsPage.SupplierResumeComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersFeatureModule { }
