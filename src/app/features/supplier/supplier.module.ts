import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SampleCommonModule } from '~common/sample';
import { SupplierCommonModule } from '~common/supplier';
import { TaskCommonModule } from '~common/task';
import { routes } from '~features/supplier/routes';
import { NavBarModule } from '~shared/navbar';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';

import {
	SupplierActivityComponent,
	SupplierDetailsComponent,
	SupplierProductsComponent,
	SupplierProductsPageComponent,
	SupplierSamplesComponent,
	SuppliersPageComponent,
	SupplierTasksComponent,
	SupplierTopCardComponent,
} from './pages';
import { SupplierFeatureService } from './services';
import { CommentCommonModule } from '~common/comment';

@NgModule({
	imports: [
		ActivityCommonModule,
		NavBarModule,
		ProductCommonModule,
		ProductCommonModule,
		RatingModule,
		RouterModule.forChild(routes),
		SampleCommonModule,
		SharedModule,
		SupplierCommonModule,
		TaskCommonModule,
		ProductCommonModule,
		CommentCommonModule,
		SupplierCommonModule
	],
	declarations: [
		SupplierActivityComponent,
		SupplierDetailsComponent,
		SupplierProductsComponent,
		SupplierProductsPageComponent,
		SupplierSamplesComponent,
		SupplierTasksComponent,
		SuppliersPageComponent,
		SupplierTopCardComponent
	],
	entryComponents: [],
	exports: [SuppliersPageComponent],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersModule { }
