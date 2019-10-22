import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { CommentCommonModule } from '~common/comment';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { ProductCommonModule } from '~common/product/product-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/supplier/routes';
import { NavBarModule } from '~shared/navbar';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';

import {
	SupplierActivityComponent,
	SupplierDetailsComponent,
	SupplierFilesComponent,
	SupplierHeaderDetailsComponent,
	SupplierProductsPageComponent,
	SupplierSamplesComponent,
	SuppliersPageComponent,
	SupplierTasksComponent,
} from './pages';
import { SupplierFeatureService } from './services';

@NgModule({
	imports: [
		ActivityCommonModule,
		NavBarModule,
		ProductCommonModule,
		ProductCommonModule,
		RatingModule,
		RouterModule.forChild(routes),
		SharedModule,
		ProductCommonModule,
		CommentCommonModule,
		PreviewsCommonModule,
		TablesCommonModule
	],
	declarations: [
		SupplierActivityComponent,
		SupplierDetailsComponent,
		SupplierProductsPageComponent,
		SupplierSamplesComponent,
		SupplierTasksComponent,
		SuppliersPageComponent,
		SupplierFilesComponent,
		SupplierHeaderDetailsComponent
	],
	entryComponents: [],
	exports: [SuppliersPageComponent],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersModule { }
