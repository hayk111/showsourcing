import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { fromSupplierContact } from '~app/features/supplier/store/contacts/contact.bundle';
import { ContactEffects } from '~app/features/supplier/store/contacts/contact.effects';
import { fromSupplierProduct } from '~app/features/supplier/store/product/product.bundle';
import { ProductEffects } from '~app/features/supplier/store/product/product.effects';
import { CarouselModule } from '~app/shared/carousel';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';
import { FileModule } from '~app/shared/file';
import { RatingModule } from '~app/shared/rating';
import { SharedModule } from '~app/shared/shared.module';
import { StatusModule } from '~app/shared/status/status.module';
import { TableModule } from '~app/shared/table';
import { DialogModule } from '~shared/dialog';
import { SelectionBarModule } from '~shared/selection-bar';
import { TagModule } from '~shared/tag';

import { NewSupplierDlgComponent, SupplierListViewComponent } from './components';
import { SupplierContactCardComponent } from './components/supplier-contact-card/supplier-contact-card.component';
import {
	SupplierNewContactDlgComponent,
} from './components/supplier-contact-card/supplier-new-contact-dlg/supplier-new-contact-dlg.component';
import { SupplierContactComponent } from './components/supplier-contact/supplier-contact.component';
import { SupplierDescriptionComponent } from './components/supplier-description/supplier-description.component';
import { SupplierInfosComponent } from './components/supplier-infos/supplier-infos.component';
import { SupplierLatestProductsComponent } from './components/supplier-latest-products/supplier-latest-products.component';
import { SupplierMainBottomComponent } from './components/supplier-main/supplier-main-bottom/supplier-main-bottom.component';
import { SupplierMainInfoComponent } from './components/supplier-main/supplier-main-info/supplier-main-info.component';
import { SupplierMainTitleComponent } from './components/supplier-main/supplier-main-title/supplier-main-title.component';
import { SupplierMainComponent } from './components/supplier-main/supplier-main.component';
import { SupplierSummaryComponent } from './components/supplier-main/supplier-summary/supplier-summary.component';
import { SupplierDetailsComponent, SuppliersPageComponent } from './containers';


@NgModule({
	imports: [
		SharedModule,
		EffectsModule.forFeature([
			ContactEffects,
			ProductEffects
		]),
		RouterModule.forChild([]),
		FileModule, // file-card
		CarouselModule,
		StatusModule,
		EntityPagesModule,
		DialogModule, // TODO to be removed and placed inside the component module using it
		ReactiveFormsModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used by list view
		TagModule, // TODO to be removed and placed inside the component module using it
		RatingModule, // used for hearth
	],
	declarations: [
		SupplierDetailsComponent,
		NewSupplierDlgComponent,
		SuppliersPageComponent,
		SupplierListViewComponent,
		SupplierMainComponent,
		SupplierSummaryComponent,
		SupplierMainTitleComponent,
		SupplierMainInfoComponent,
		SupplierMainBottomComponent,
		SupplierLatestProductsComponent,
		SupplierInfosComponent,
		SupplierContactCardComponent,
		SupplierContactComponent,
		SupplierNewContactDlgComponent,
		SupplierDescriptionComponent,
	],
	entryComponents: [
		NewSupplierDlgComponent,
		SupplierNewContactDlgComponent
	],
	exports: [
		SuppliersPageComponent
	],
	providers: [],
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
