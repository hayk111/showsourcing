import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupplierListViewComponent } from '~features/supplier/components';
import {
	SupplierContactCardComponent,
} from '~features/supplier/components/supplier-contact-card/supplier-contact-card.component';
import { SupplierContactComponent } from '~features/supplier/components/supplier-contact/supplier-contact.component';
import {
	SupplierDescriptionComponent,
} from '~features/supplier/components/supplier-description/supplier-description.component';
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
import { SupplierDetailsComponent, SuppliersPageComponent } from '~features/supplier/containers';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { SupplierPreviewComponent } from '~features/supplier/containers/supplier-preview/supplier-preview.component';
import { routes } from '~features/supplier/routes';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { BadgeModule } from '~shared/badge';
import { CarouselModule } from '~shared/carousel';
import { DialogModule } from '~shared/dialog';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { FileModule } from '~shared/file';
import { FiltersModule } from '~shared/filters';
import { PanelModule } from '~shared/panel/panel.module';
import { RatingModule } from '~shared/rating';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { SupplierTopCardComponent } from '~features/supplier/components/supplier-top-card/supplier-top-card.component';
import { SupplierActivityComponent } from '~features/supplier/containers/supplier-activity/supplier-activity.component';
import { SupplierPublicProfileComponent } from '~features/supplier/containers/supplier-public-profile/supplier-public-profile.component';
import { SupplierImagesComponent } from '~features/supplier/components/supplier-images/supplier-images.component';
import { SupplierProductsComponent } from '~features/supplier/containers/supplier-products/supplier-products.component';
import { ImageModule } from '~shared/image/image.module';
import { ActivityModule } from '~shared/activity/activity.module';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { ProductCommonModule } from '~shared/product-common/product-common.module';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		FileModule, // file-card
		DynamicFormsModule,
		CarouselModule,
		TopPanelModule,
		DialogModule, // used by new contact dialog
		ReactiveFormsModule, // used by new contact dialog
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used by list view
		BadgeModule,
		WorkflowActionModule,
		RatingModule, // used for hearth
		FiltersModule, // used for filters
		BadgeModule,
		PanelModule,
		SearchAutocompleteModule,
		ActivityModule,
		ActionBarModule,
		ProductCommonModule
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
		SupplierPreviewComponent,
		SupplierTopCardComponent,
		SupplierActivityComponent,
		SupplierPublicProfileComponent,
		SupplierImagesComponent,
		SupplierProductsComponent
	],
	entryComponents: [
		NewSupplierDlgComponent,
		NewContactDlgComponent
	],
	exports: [
		SuppliersPageComponent
	],
	providers: [
		SupplierFeatureService
	],
})
export class SuppliersModule {

}
