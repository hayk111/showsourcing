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
	SupplierProductsPageComponent,
	SupplierSamplesComponent,
	SuppliersPageComponent,
	SupplierTasksComponent,
	SupplierFilesComponent,
	SupplierTopCardComponent,
} from './pages';
import { SupplierFeatureService } from './services';
import { CommentCommonModule } from '~common/comment';
import { AttachmentCommonModule } from '~common/attachment';

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
		SupplierCommonModule,
		AttachmentCommonModule
	],
	declarations: [
		SupplierActivityComponent,
		SupplierDetailsComponent,
		SupplierProductsPageComponent,
		SupplierSamplesComponent,
		SupplierTasksComponent,
		SuppliersPageComponent,
		SupplierFilesComponent,
		SupplierTopCardComponent
	],
	entryComponents: [],
	exports: [SuppliersPageComponent],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersModule { }
