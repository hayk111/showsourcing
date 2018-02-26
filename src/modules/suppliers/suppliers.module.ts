import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierStatusIconComponent, NewSupplierDlgComponent } from './components';
import { IconsModule } from '~shared/icons';
import { AppStoreModule } from '~store/store.module';
import { DialogModule } from '~dialog/dialog.module';
import { UserModule } from '~user';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';
import { StoreModule } from '@ngrx/store';
import { effects } from '~suppliers/store/effects';
import { EffectsModule } from '@ngrx/effects';
import { EntityPageModule } from '~shared/entity-page';
import { SuppliersPageComponent } from '~suppliers/containers';
import { SupplierListViewComponent } from '~suppliers/components';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagModule } from '~shared/tag';
import { UtilsModule } from '~shared/utils';
import { SelectionBarModule } from '~shared/selection-bar';
import { SupplierDetailsComponent } from './containers';
import { EntityMainCardModule } from '~shared/entity-main-card';
import { SupplierService } from './services';

@NgModule({
	imports: [
		CommonModule,
		// StoreModule.forFeature('testEntities', reducers),
		// EffectsModule.forFeature(effects),
		IconsModule, // TODO to be removed and placed inside the component module using it
		AppStoreModule.forRoot(), // TODO to be removed and placed inside the component module using it
		DialogModule, // TODO to be removed and placed inside the component module using it
		ReactiveFormsModule, // TODO to be removed and placed inside the component module using it
		InputsModule, // TODO to be removed and placed inside the component module using it
		UserModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // TODO to be removed and placed inside the component module using it
		EntityPageModule, // TODO to be removed and placed inside the component module using it
		NgxDatatableModule, // TODO to be removed and placed inside the component module using it
		TagModule, // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		EntityMainCardModule, // used to display the main card in details
	],
	declarations: [
		SupplierDetailsComponent,
		SupplierStatusIconComponent,
		NewSupplierDlgComponent,
		SuppliersPageComponent,
		SupplierListViewComponent,
	],
	exports: [SupplierStatusIconComponent, NewSupplierDlgComponent, SuppliersPageComponent],
	providers: [ SupplierService ]
})
export class SuppliersModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SuppliersModule,
			providers: [ SupplierService ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: SuppliersModule,
		};
	}
}
