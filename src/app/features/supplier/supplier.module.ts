import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SampleCommonModule } from '~common/sample';
import { SupplierCommonModule } from '~common/supplier';
import { TaskCommonModule } from '~common/task';
import { DeprecatedModule } from '~deprecated/deprecated.module';
import { routes } from '~features/supplier/routes';
import { NavBarModule } from '~shared/navbar';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';

import {
	SupplierContactCardComponent,
	SupplierContactComponent,
	SupplierDescriptionComponent,
	SupplierImagesComponent,
	SupplierInfosComponent,
	SupplierLatestProductsComponent,
	SupplierListViewComponent,
	SupplierMainComponent,
	SupplierMainTitleComponent,
	SupplierProductsCardViewComponent,
	SupplierProductsListViewComponent,
	SupplierSummaryComponent,
	SupplierTopCardComponent,
} from './components';
import {
	NewContactDlgComponent,
	NewSupplierDlgComponent,
	SupplierActivityComponent,
	SupplierDetailsComponent,
	SupplierGeneralInfoComponent,
	SupplierProductsComponent,
	SupplierProductsPageComponent,
	SupplierPublicProfileComponent,
	SupplierSamplesComponent,
	SuppliersPageComponent,
	SupplierTasksComponent,
} from './containers';
import { SupplierFeatureService } from './services';

@NgModule({
	imports: [
		ActivityCommonModule,
		DeprecatedModule,
		NavBarModule,
		ProductCommonModule,
		ProductCommonModule,
		RatingModule,
		RouterModule.forChild(routes),
		SampleCommonModule,
		SharedModule,
		SupplierCommonModule,
		TaskCommonModule
	],
	declarations: [
		NewContactDlgComponent,
		NewSupplierDlgComponent,
		SupplierActivityComponent,
		SupplierContactCardComponent,
		SupplierContactComponent,
		SupplierDescriptionComponent,
		SupplierDetailsComponent,
		SupplierGeneralInfoComponent,
		SupplierImagesComponent,
		SupplierInfosComponent,
		SupplierLatestProductsComponent,
		SupplierListViewComponent,
		SupplierMainComponent,
		SupplierMainTitleComponent,
		SupplierProductsCardViewComponent,
		SupplierProductsComponent,
		SupplierProductsListViewComponent,
		SupplierProductsPageComponent,
		SupplierPublicProfileComponent,
		SupplierSamplesComponent,
		SupplierSummaryComponent,
		SupplierTasksComponent,
		SupplierTopCardComponent,
		SuppliersPageComponent
	],
	entryComponents: [NewSupplierDlgComponent, NewContactDlgComponent],
	exports: [SuppliersPageComponent],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersModule { }
