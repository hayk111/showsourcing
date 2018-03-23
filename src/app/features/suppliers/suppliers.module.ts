import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileModule } from '~app/features/file';
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
import { SupplierListViewComponent } from '~suppliers/components';
import { SuppliersPageComponent } from '~suppliers/containers';
import { UserModule } from '~user';

import { NewSupplierDlgComponent, SupplierStatusIconComponent } from './components';
import { SupplierDetailsComponent } from './containers';
import { routes } from './routes';
import { SupplierService } from './services';
import { SupplierMainComponent } from './components/supplier-main/supplier-main.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FileModule, // file-card
		CardModule,
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
