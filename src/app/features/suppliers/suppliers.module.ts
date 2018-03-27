import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from '~app/shared/card';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';
import { RatingModule } from '~app/shared/rating';
import { TableModule } from '~app/shared/table';
import { EntityModule } from '~entity';
import { DialogModule } from '~shared/dialog';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { SelectionBarModule } from '~shared/selection-bar';
import { TagModule } from '~shared/tag';
import { UtilsModule } from '~shared/utils';

import { NewSupplierDlgComponent, SupplierStatusIconComponent, SupplierListViewComponent } from './components';
import { SupplierDetailsComponent, SuppliersPageComponent } from './containers';
import { routes } from './routes';
import { SupplierMainComponent } from './components/supplier-main/supplier-main.component';
import { SupplierSummaryComponent } from './components/supplier-main/supplier-summary/supplier-summary.component';
import { SupplierMainHeaderComponent } from './components/supplier-main/supplier-main-header/supplier-main-header.component';
import { SupplierMainInfoComponent } from './components/supplier-main/supplier-main-info/supplier-main-info.component';
import { SupplierMainBottomComponent } from './components/supplier-main/supplier-main-bottom/supplier-main-bottom.component';
import { SupplierLatestProductsComponent } from './components/supplier-latest-products/supplier-latest-products.component';
import { StatusModule } from '~app/shared/status/status.module';
import { SupplierInfosComponent } from './components/supplier-infos/supplier-infos.component';
import { EditableFieldModule } from '~app/shared/editable-field';
import { UserModule } from '~app/features/user';
import { FileModule } from '~app/shared/file';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FileModule, // file-card
		CardModule,
		EditableFieldModule,
		StatusModule,
		IconsModule, // TODO to be removed and placed inside the component module using it
		EntityModule.forChild(), // used
		EntityPagesModule,
		DialogModule, // TODO to be removed and placed inside the component module using it
		ReactiveFormsModule, // TODO to be removed and placed inside the component module using it
		InputsModule, // TODO to be removed and placed inside the component module using it
		UserModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // TODO to be removed and placed inside the component module using it
		TableModule, // used by list view
		TagModule, // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		RatingModule, // used for hearth
	],
	declarations: [
		SupplierDetailsComponent,
		SupplierStatusIconComponent,
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
	],
	exports: [SupplierStatusIconComponent, NewSupplierDlgComponent, SuppliersPageComponent],
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
