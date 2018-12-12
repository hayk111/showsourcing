import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ProductElementModule } from '~common/product/product-elements-module';
import { SampleCommonModule } from '~common/sample';
import { SupplierCommonModule } from '~common/supplier';
import { TaskCommonModule } from '~common/task';
import { SupplierListViewComponent } from '~features/supplier/components';
import {
	SupplierContactCardComponent,
} from '~features/supplier/components/supplier-contact-card/supplier-contact-card.component';
import { SupplierContactComponent } from '~features/supplier/components/supplier-contact/supplier-contact.component';
import {
	SupplierDescriptionComponent,
} from '~features/supplier/components/supplier-description/supplier-description.component';
import { SupplierImagesComponent } from '~features/supplier/components/supplier-images/supplier-images.component';
import { SupplierInfosComponent } from '~features/supplier/components/supplier-infos/supplier-infos.component';
import {
	SupplierLatestProductsComponent,
} from '~features/supplier/components/supplier-latest-products/supplier-latest-products.component';
import {
	SupplierMainTitleComponent,
} from '~features/supplier/components/supplier-main/supplier-main-title/supplier-main-title.component';
import { SupplierMainComponent } from '~features/supplier/components/supplier-main/supplier-main.component';
import {
	SupplierSummaryComponent,
} from '~features/supplier/components/supplier-main/supplier-summary/supplier-summary.component';
import { SupplierTopCardComponent } from '~features/supplier/components/supplier-top-card/supplier-top-card.component';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~features/supplier/containers';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { SupplierActivityComponent } from '~features/supplier/containers/supplier-activity/supplier-activity.component';
import { SupplierProductsComponent } from '~features/supplier/containers/supplier-products/supplier-products.component';
import {
	SupplierPublicProfileComponent,
} from '~features/supplier/containers/supplier-public-profile/supplier-public-profile.component';
import { routes } from '~features/supplier/routes';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { SharedModule } from '~shared/shared.module';

import { SupplierSamplesComponent } from './containers/supplier-samples/supplier-samples.component';
import { SupplierTasksComponent } from './containers/supplier-tasks/supplier-tasks.component';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		ActivityCommonModule,
		ProductCommonModule,
		ProductElementModule,
		TaskCommonModule,
		SampleCommonModule,
		SupplierCommonModule
	],
	declarations: [
		SupplierDetailsComponent,
		NewSupplierDlgComponent,
		NewContactDlgComponent,
		SuppliersPageComponent,
		SupplierListViewComponent,
		SupplierMainComponent,
		SupplierSummaryComponent,
		SupplierMainTitleComponent,
		SupplierLatestProductsComponent,
		SupplierInfosComponent,
		SupplierContactCardComponent,
		SupplierContactComponent,
		SupplierDescriptionComponent,
		SupplierTopCardComponent,
		SupplierActivityComponent,
		SupplierPublicProfileComponent,
		SupplierImagesComponent,
		SupplierProductsComponent,
		SupplierTasksComponent,
		SupplierSamplesComponent
	],
	entryComponents: [NewSupplierDlgComponent, NewContactDlgComponent],
	exports: [SuppliersPageComponent],
	providers: [
		SupplierFeatureService
	]
})
export class SuppliersModule { }
