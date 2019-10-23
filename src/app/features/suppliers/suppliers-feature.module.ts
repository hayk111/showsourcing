import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { SelectionBarsCommonModule } from '~common/selection-bars/selection-bars-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from './routes';
import { NavBarModule } from '~shared/navbar';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';

import * as DetailsPage from './pages/supplier-details';
import * as TablePage from './pages/suppliers';
import { SupplierFeatureService } from './services';
import { BoardsCommonModule } from '~common/boards/boards-common.module';

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
		BoardsCommonModule
	],
	declarations: [
		TablePage.SuppliersPageComponent,
		DetailsPage.ActivityPageComponent,
		DetailsPage.SupplierDetailsPageComponent,
		DetailsPage.FilesPageComponent,
		DetailsPage.SamplesPageComponent,
		DetailsPage.ProductsPageComponent,
		DetailsPage.SupplierHeaderDetailsComponent,
		DetailsPage.TasksPageComponent
	],
	entryComponents: [],
	exports: [],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersFeatureModule { }
