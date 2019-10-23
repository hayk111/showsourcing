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

import {
	ActivityPageComponent,
	SupplierDetailsPageComponent,
	FilesPageComponent,
	SupplierHeaderDetailsComponent,
	ProductsPageComponent,
	SupplierSamplesComponent,
	SuppliersPageComponent,
	SupplierTasksComponent,
} from './pages';
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
		ActivityPageComponent,
		SupplierDetailsPageComponent,
		ProductsPageComponent,
		SupplierSamplesComponent,
		SupplierTasksComponent,
		SuppliersPageComponent,
		FilesPageComponent,
		SupplierHeaderDetailsComponent
	],
	entryComponents: [],
	exports: [SuppliersPageComponent],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersFeatureModule { }
