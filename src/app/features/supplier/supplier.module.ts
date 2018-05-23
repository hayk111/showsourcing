import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { ContactService } from '~features/supplier/services/contact.service';
import { SelectionService } from '~features/supplier/services/selection.service';
import { CarouselModule } from '~shared/carousel';
import { DialogModule } from '~shared/dialog';
import { EntityPagesModule } from '~shared/entity-pages/entity-pages.module';
import { FileModule } from '~shared/file';
import { RatingModule } from '~shared/rating';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { StatusModule } from '~shared/status/status.module';
import { TableModule } from '~shared/table';
import { TagModule } from '~shared/tag';

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
import { SupplierService } from './services/supplier.service';
import { DynamicFormsModule } from '~shared/dynamic-forms';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		FileModule, // file-card
		DynamicFormsModule,
		CarouselModule,
		StatusModule,
		EntityPagesModule,
		DialogModule, // used by new contact dialog
		ReactiveFormsModule, // used by new contact dialog
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used by list view
		TagModule, // TODO check if used
		RatingModule, // used for hearth
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
	],
	entryComponents: [
		NewSupplierDlgComponent,
		NewContactDlgComponent
	],
	exports: [
		SuppliersPageComponent
	],
	providers: [
		SupplierService,
		SelectionService,
		ContactService
	],
})
export class SuppliersModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SuppliersModule,
			providers: [],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: SuppliersModule,
		};
	}
}
