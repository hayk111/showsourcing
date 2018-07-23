import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { CarouselModule } from '~shared/carousel';
import { DialogModule } from '~shared/dialog';
import { FileModule } from '~shared/file';
import { FiltersModule } from '~shared/filters';
import { RatingModule } from '~shared/rating';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { StatusModule } from '~shared/status/status.module';
import { TableModule } from '~shared/table';
import { TagModule } from '~shared/tag';
import { routes } from './routes';
import { BadgeModule } from '~shared/badge/badge.module';

import { SupplierListViewComponent } from './components';
import { SupplierContactCardComponent } from './components/supplier-contact-card/supplier-contact-card.component';
import { SupplierContactComponent } from './components/supplier-contact/supplier-contact.component';
import { SupplierDescriptionComponent } from './components/supplier-description/supplier-description.component';
import { SupplierInfosComponent } from './components/supplier-infos/supplier-infos.component';
import { SupplierLatestProductsComponent } from './components/supplier-latest-products/supplier-latest-products.component';
import { SupplierMainTitleComponent } from './components/supplier-main/supplier-main-title/supplier-main-title.component';
import { SupplierMainComponent } from './components/supplier-main/supplier-main.component';
import { SupplierSummaryComponent } from './components/supplier-main/supplier-summary/supplier-summary.component';
import { SupplierDetailsComponent, SuppliersPageComponent } from './containers';
import { SupplierFeatureService } from './services/supplier-feature.service';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { PanelModule } from '~shared/panel/panel.module';
import { SupplierPreviewComponent } from './containers/supplier-preview/supplier-preview.component';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SupplierTopCardComponent } from './components/supplier-top-card/supplier-top-card.component';
import { SupplierActivityComponent } from './containers/supplier-activity/supplier-activity.component';
import { SupplierPublicProfileComponent } from './containers/supplier-public-profile/supplier-public-profile.component';
import { SupplierImagesComponent } from './components/supplier-images/supplier-images.component';
import { SupplierProductsComponent } from './containers/supplier-products/supplier-products.component';
import { ImageModule } from '~shared/image/image.module';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		FileModule, // file-card
		DynamicFormsModule,
		CarouselModule,
		StatusModule,
		TopPanelModule,
		DialogModule, // used by new contact dialog
		ReactiveFormsModule, // used by new contact dialog
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used by list view
		TagModule,
		WorkflowActionModule,
		RatingModule, // used for hearth
		FiltersModule, // used for filters
		BadgeModule,
		PanelModule,
		SearchAutocompleteModule,
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
		SupplierProductsComponent,
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
