import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserModule } from '~app/features/user';
import { CardModule } from '~app/shared/card';
import { EditableFieldModule } from '~app/shared/editable-field';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';
import { FileModule } from '~app/shared/file';
import { RatingModule } from '~app/shared/rating';
import { StatusModule } from '~app/shared/status/status.module';
import { TableModule } from '~app/shared/table';
import { EntityModule } from '~entity';
import { DialogModule } from '~shared/dialog';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { SelectionBarModule } from '~shared/selection-bar';
import { TagModule } from '~shared/tag';
import { UtilsModule } from '~shared/utils';

import { NewSupplierDlgComponent, SupplierListViewComponent } from './components';
import { SupplierContactCardComponent } from './components/supplier-contact-card/supplier-contact-card.component';
import { SupplierContactComponent } from './components/supplier-contact/supplier-contact.component';
import { SupplierInfosComponent } from './components/supplier-infos/supplier-infos.component';
import { SupplierLatestProductsComponent } from './components/supplier-latest-products/supplier-latest-products.component';
import { SupplierMainBottomComponent } from './components/supplier-main/supplier-main-bottom/supplier-main-bottom.component';
import { SupplierMainHeaderComponent } from './components/supplier-main/supplier-main-header/supplier-main-header.component';
import { SupplierMainInfoComponent } from './components/supplier-main/supplier-main-info/supplier-main-info.component';
import { SupplierMainComponent } from './components/supplier-main/supplier-main.component';
import { SupplierSummaryComponent } from './components/supplier-main/supplier-summary/supplier-summary.component';
import { SupplierDetailsComponent, SuppliersPageComponent } from './containers';
import { routes } from './routes';
import { CarouselModule } from '~app/shared/carousel';
import {
	SupplierNewContactDlgComponent
} from './components/supplier-contact-card/supplier-new-contact-dlg/supplier-new-contact-dlg.component';
import { SharedModule } from '~app/shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
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
		SupplierMainHeaderComponent,
		SupplierMainInfoComponent,
		SupplierMainBottomComponent,
		SupplierLatestProductsComponent,
		SupplierInfosComponent,
		SupplierContactCardComponent,
		SupplierContactComponent,
		SupplierNewContactDlgComponent,
	],
	entryComponents: [
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
