import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierStatusIconComponent, NewSupplierDlgComponent } from './components';
import { IconsModule } from '../shared/icons/icons.module';
import { AppStoreModule } from '../store/store.module';
import { DialogModule } from '../shared/dialog/dialog.module';
import { UserModule } from '../user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../shared/inputs/inputs.module';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@modules/suppliers';
import { EffectsModule } from '@ngrx/effects';
import { EntityPageModule } from '@shared/entity-page/entity-page.module';
import { SuppliersPageComponent } from '@suppliers/containers/suppliers-page/suppliers-page.component';
import { SupplierListViewComponent } from '@suppliers/components/supplier-list-view/supplier-list-view.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagModule } from '@shared/tag/tag.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { SelectionBarModule } from '@shared/selection-bar/selection-bar.module';

@NgModule({
  imports: [
		CommonModule,
		StoreModule.forFeature('testEntities', reducers),
		EffectsModule.forFeature(effects),
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

  ],
	declarations: [
	  SupplierStatusIconComponent,
    NewSupplierDlgComponent,
    SuppliersPageComponent,
    SupplierListViewComponent
  ],
	exports: [ SupplierStatusIconComponent, NewSupplierDlgComponent, SuppliersPageComponent ]
})
export class SuppliersModule { }
