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
import { TranslateModule } from '@ngx-translate/core';

import {
	SupplierContactCardComponent,
	SupplierContactComponent,
	SupplierListViewComponent,
	SupplierProductsCardViewComponent,
	SupplierTopCardComponent,
} from './components';
import {
	SupplierActivityComponent,
	SupplierDetailsComponent,
	SupplierProductsComponent,
	SupplierProductsPageComponent,
	SupplierSamplesComponent,
	SuppliersPageComponent,
	SupplierTasksComponent,
} from './containers';
import { SupplierFeatureService } from './services';

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
		TranslateModule
	],
	declarations: [
		SupplierActivityComponent,
		SupplierContactCardComponent,
		SupplierContactComponent,
		SupplierDetailsComponent,
		SupplierListViewComponent,
		SupplierProductsCardViewComponent,
		SupplierProductsComponent,
		SupplierProductsPageComponent,
		SupplierSamplesComponent,
		SupplierTasksComponent,
		SupplierTopCardComponent,
		SuppliersPageComponent
	],
	entryComponents: [],
	exports: [SuppliersPageComponent],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersModule { }
