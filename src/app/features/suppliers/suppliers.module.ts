import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DialogModule } from '~shared/dialog';
import { EntityMainCardModule } from '~shared/entity-main-card';
import { EntityPageModule } from '~shared/entity-page';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { SelectionBarModule } from '~shared/selection-bar';
import { TagModule } from '~shared/tag';
import { UtilsModule } from '~shared/utils';
import { EntityModule } from '~entity';
import { SupplierListViewComponent } from '~suppliers/components';
import { SuppliersPageComponent } from '~suppliers/containers';
import { UserModule } from '~user';

import { NewSupplierDlgComponent, SupplierStatusIconComponent } from './components';
import { SupplierDetailsComponent } from './containers';
import { SupplierService } from './services';
import { routes } from './routes';
import { TableModule } from '~app/shared/table';
import { RatingModule } from '~app/shared/rating';
import { FileModule } from '~app/features/file';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FileModule, // file-card
		IconsModule, // TODO to be removed and placed inside the component module using it
		EntityModule.forChild(), // TODO to be removed and placed inside the component module using it
		DialogModule, // TODO to be removed and placed inside the component module using it
		ReactiveFormsModule, // TODO to be removed and placed inside the component module using it
		InputsModule, // TODO to be removed and placed inside the component module using it
		UserModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // TODO to be removed and placed inside the component module using it
		EntityPageModule, // TODO to be removed and placed inside the component module using it
		TableModule, // used by list view
		TagModule, // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		EntityMainCardModule, // used to display the main card in details,
		RatingModule, // used for hearth
	],
	declarations: [
		SupplierDetailsComponent,
		SupplierStatusIconComponent,
		NewSupplierDlgComponent,
		SuppliersPageComponent,
		SupplierListViewComponent,
	],
	exports: [SupplierStatusIconComponent, NewSupplierDlgComponent, SuppliersPageComponent],
	providers: [SupplierService],
})
export class SuppliersModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SuppliersModule,
			providers: [SupplierService],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: SuppliersModule,
		};
	}
}
